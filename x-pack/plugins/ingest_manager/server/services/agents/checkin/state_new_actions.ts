/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { timer, from, Observable, TimeoutError } from 'rxjs';
import { omit } from 'lodash';
import { promisify } from 'util';
import { RateLimiter } from 'limiter';
import {
  shareReplay,
  distinctUntilKeyChanged,
  switchMap,
  mergeMap,
  merge,
  filter,
  timeout,
  take,
  delayWhen,
} from 'rxjs/operators';
import { SavedObjectsClientContract, KibanaRequest } from 'src/core/server';
import { Agent, AgentAction, AgentPolicyAction, AgentSOAttributes } from '../../../types';
import * as APIKeysService from '../../api_keys';
import {
  AGENT_SAVED_OBJECT_TYPE,
  AGENT_UPDATE_ACTIONS_INTERVAL_MS,
  AGENT_POLICY_ROLLOUT_RATE_LIMIT_INTERVAL_MS,
  AGENT_POLICY_ROLLOUT_RATE_LIMIT_REQUEST_PER_INTERVAL,
} from '../../../constants';
import {
  getNewActionsSince,
  getLatestConfigChangeAction,
  getAgentPolicyActionByIds,
} from '../actions';
import { appContextService } from '../../app_context';
import { toPromiseAbortable, AbortError, createRateLimiter } from './rxjs_utils';

function getInternalUserSOClient() {
  const fakeRequest = ({
    headers: {},
    getBasePath: () => '',
    path: '/',
    route: { settings: {} },
    url: {
      href: '/',
    },
    raw: {
      req: {
        url: '/',
      },
    },
  } as unknown) as KibanaRequest;

  return appContextService.getInternalUserSOClient(fakeRequest);
}

function createNewActionsSharedObservable(): Observable<AgentAction[]> {
  let lastTimestamp = new Date().toISOString();

  return timer(0, AGENT_UPDATE_ACTIONS_INTERVAL_MS).pipe(
    switchMap(() => {
      const internalSOClient = getInternalUserSOClient();

      const timestamp = lastTimestamp;
      lastTimestamp = new Date().toISOString();
      return from(getNewActionsSince(internalSOClient, timestamp));
    }),
    shareReplay({ refCount: true, bufferSize: 1 })
  );
}

function createAgentPolicyActionSharedObservable(agentPolicyId: string) {
  const internalSOClient = getInternalUserSOClient();

  return timer(0, AGENT_UPDATE_ACTIONS_INTERVAL_MS).pipe(
    switchMap(() => from(getLatestConfigChangeAction(internalSOClient, agentPolicyId))),
    filter((data): data is AgentPolicyAction => data !== undefined),
    distinctUntilKeyChanged('id'),
    switchMap((data) =>
      from(getAgentPolicyActionByIds(internalSOClient, [data.id]).then((r) => r[0]))
    ),
    shareReplay({ refCount: true, bufferSize: 1 })
  );
}

function createAgentPolicyActionPoller(agentPolicyId: string) {
  const internalSOClient = getInternalUserSOClient();
  let latestPolicyAction: AgentPolicyAction;
  let policyTimeout: any | undefined;

  const limitter = new RateLimiter(
    appContextService.getConfig()?.fleet.agentPolicyRolloutRateLimitRequestPerInterval ??
      AGENT_POLICY_ROLLOUT_RATE_LIMIT_REQUEST_PER_INTERVAL,
    appContextService.getConfig()?.fleet.agentPolicyRolloutRateLimitIntervalMs ??
      AGENT_POLICY_ROLLOUT_RATE_LIMIT_INTERVAL_MS
  );

  const removeTokens = promisify(limitter.removeTokens.bind(limitter));
  const queue: Array<{
    resolve: (data: AgentPolicyAction) => void;
    agentRevision?: number | null;
  }> = [];

  async function refresh() {
    const action = await getLatestConfigChangeAction(internalSOClient, agentPolicyId);
    if (action !== undefined && (!latestPolicyAction || latestPolicyAction.id !== action.id)) {
      latestPolicyAction = await getAgentPolicyActionByIds(internalSOClient, [action.id]).then(
        (r) => r[0]
      );
      for (const queued of [...queue]) {
        if ((queued.agentRevision || 0) < latestPolicyAction.policy_revision) {
          await removeTokens(1);
          queued.resolve(latestPolicyAction);
          cancel(queued);
        }
      }
    }
    if (queue.length === 0) {
      policyTimeout = undefined;
    } else {
      policyTimeout = setTimeout(refresh, AGENT_UPDATE_ACTIONS_INTERVAL_MS);
    }
  }

  async function waitForNewAction(
    agentId: string,
    agentRevision?: number | null
  ): Promise<AgentPolicyAction> {
    if (!policyTimeout) {
      policyTimeout = setTimeout(refresh, AGENT_UPDATE_ACTIONS_INTERVAL_MS);
    }
    if (latestPolicyAction && latestPolicyAction.policy_revision > (agentRevision || 0)) {
      await removeTokens(1);
      return { promise: Promise.resolve(latestPolicyAction) };
    }

    const r = {};

    r.promise = new Promise<AgentPolicyAction>((resolve) => {
      r.resolve = resolve;
      r.agentRevision = agentRevision;
    });

    queue.push(r);

    return r;
  }

  function cancel(d: any) {
    const index = queue.indexOf(d);
    if (index > 0) {
      queue[index].resolve(null);
      queue.splice(queue[index], 1);
    }
  }

  return {
    waitForNewAction,
    cancel,
  };
}

async function getOrCreateAgentDefaultOutputAPIKey(
  soClient: SavedObjectsClientContract,
  agent: Agent
): Promise<string> {
  const {
    attributes: { default_api_key: defaultApiKey },
  } = await appContextService
    .getEncryptedSavedObjects()
    .getDecryptedAsInternalUser<AgentSOAttributes>(AGENT_SAVED_OBJECT_TYPE, agent.id);

  if (defaultApiKey) {
    return defaultApiKey;
  }

  const outputAPIKey = await APIKeysService.generateOutputApiKey(soClient, 'default', agent.id);
  await soClient.update<AgentSOAttributes>(AGENT_SAVED_OBJECT_TYPE, agent.id, {
    default_api_key: outputAPIKey.key,
    default_api_key_id: outputAPIKey.id,
  });

  return outputAPIKey.key;
}

async function createAgentActionFromPolicyAction(
  soClient: SavedObjectsClientContract,
  agent: Agent,
  policyAction: AgentPolicyAction
) {
  const newAgentAction: AgentAction = Object.assign(
    omit(
      // Faster than clone
      JSON.parse(JSON.stringify(policyAction)) as AgentPolicyAction,
      'policy_id',
      'policy_revision'
    ),
    {
      agent_id: agent.id,
    }
  );

  // Mutate the policy to set the api token for this agent
  newAgentAction.data.config.outputs.default.api_key = await getOrCreateAgentDefaultOutputAPIKey(
    soClient,
    agent
  );

  return [newAgentAction];
}

export function agentCheckinStateNewActionsFactory() {
  // Shared Observables
  const agentPolicies$ = new Map<string, Observable<AgentPolicyAction>>();
  const newActions$ = createNewActionsSharedObservable();
  // Rx operators
  const rateLimiter = createRateLimiter(
    appContextService.getConfig()?.fleet.agentPolicyRolloutRateLimitIntervalMs ??
      AGENT_POLICY_ROLLOUT_RATE_LIMIT_INTERVAL_MS,
    appContextService.getConfig()?.fleet.agentPolicyRolloutRateLimitRequestPerInterval ??
      AGENT_POLICY_ROLLOUT_RATE_LIMIT_REQUEST_PER_INTERVAL
  );

  const agentPoliciesPoller = new Map<string, ReturnType<typeof createAgentPolicyActionPoller>>();
  async function subscribeToNewActions(
    soClient: SavedObjectsClientContract,
    agent: Agent,
    options?: { signal: AbortSignal }
  ): Promise<AgentAction[]> {
    if (!agent.policy_id) {
      throw new Error('Agent does not have a policy');
    }
    const agentPolicyId = agent.policy_id;
    if (!agentPoliciesPoller.has(agentPolicyId)) {
      agentPoliciesPoller.set(agentPolicyId, createAgentPolicyActionPoller(agentPolicyId));
    }
    const agentPolicyPoller = agentPoliciesPoller.get(agentPolicyId);
    if (!agentPolicyPoller) {
      throw new Error(`Invalid state no poller for policy ${agentPolicyId}`);
    }

    const newPolicyActionPromise = await agentPolicyPoller.waitForNewAction(
      agent.id,
      agent.policy_revision
    );

    if (options) {
      options.signal.onabort = function onRequestAborted() {
        agentPolicyPoller.cancel(newPolicyActionPromise);
      };
    }
    const action = await newPolicyActionPromise.promise;

    if (action) {
      return await createAgentActionFromPolicyAction(soClient, agent, action);
    }

    return [];
  }
  async function subscribeToNewActions2(
    soClient: SavedObjectsClientContract,
    agent: Agent,
    options?: { signal: AbortSignal }
  ): Promise<AgentAction[]> {
    if (!agent.policy_id) {
      throw new Error('Agent does not have a policy');
    }
    const agentPolicyId = agent.policy_id;
    if (!agentPolicies$.has(agentPolicyId)) {
      agentPolicies$.set(agentPolicyId, createAgentPolicyActionSharedObservable(agentPolicyId));
    }
    const agentPolicy$ = agentPolicies$.get(agentPolicyId);
    if (!agentPolicy$) {
      throw new Error(`Invalid state, no observable for policy ${agentPolicyId}`);
    }

    const stream$ = agentPolicy$.pipe(
      timeout(
        // Set a timeout 3s before the real timeout to have a chance to respond an empty response before socket timeout
        Math.max((appContextService.getConfig()?.fleet.pollingRequestTimeout ?? 0) - 3000, 3000)
      ),
      filter(
        (action) =>
          agent.policy_id !== undefined &&
          action.policy_revision !== undefined &&
          action.policy_id !== undefined &&
          action.policy_id === agent.policy_id &&
          (!agent.policy_revision || action.policy_revision > agent.policy_revision)
      ),
      delayWhen(rateLimiter),
      mergeMap((policyAction) => createAgentActionFromPolicyAction(soClient, agent, policyAction)),
      merge(newActions$),
      mergeMap(async (data) => {
        if (!data) {
          return;
        }
        const newActions = data.filter((action) => action.agent_id === agent.id);
        if (newActions.length === 0) {
          return;
        }

        return newActions;
      }),
      filter((data) => data !== undefined),
      take(1)
    );
    try {
      const data = await toPromiseAbortable(stream$, options?.signal);

      return data || [];
    } catch (err) {
      if (err instanceof TimeoutError || err instanceof AbortError) {
        return [];
      }

      throw err;
    }
  }

  return {
    subscribeToNewActions,
  };
}
