/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { timer, from, Observable, TimeoutError } from 'rxjs';
import { omit } from 'lodash';
import {
  shareReplay,
  distinctUntilKeyChanged,
  switchMap,
  mergeMap,
  merge,
  filter,
  timeout,
  take,
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
import { createRateLimiter } from './rxjs_utils';

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
  const internalSOClient = getInternalUserSOClient();

  return timer(0, AGENT_UPDATE_ACTIONS_INTERVAL_MS).pipe(
    switchMap(() => {
      return from(getNewActionsSince(internalSOClient, new Date().toISOString()));
    }),
    shareReplay({ refCount: true, bufferSize: 1 })
  );
}

// function createAgentPolicyActionSharedObservable(agentPolicyId: string) {
//   const internalSOClient = getInternalUserSOClient();

//   return timer(0, AGENT_UPDATE_ACTIONS_INTERVAL_MS).pipe(
//     switchMap(() => from(getLatestConfigChangeAction(internalSOClient, agentPolicyId);),
//     filter((data): data is AgentPolicyAction => data !== undefined),
//     distinctUntilKeyChanged('id'),
//     switchMap((data) =>
//       from(getAgentPolicyActionByIds(internalSOClient, [data.id]).then((r) => r[0]))
//     ),
//     shareReplay({ refCount: true, bufferSize: 1 })
//   );
// }

function rateLimiter(intervalMs: number, requestPerInterval: number) {
  let tokens = requestPerInterval;
  let rateLimiterTimeout: NodeJS.Timeout | undefined;

  const queue: Array<() => void> = [];

  function createTimeout() {
    return setTimeout(() => {
      tokens = requestPerInterval;

      while (queue.length > 0 && tokens > 0) {
        const r = queue.shift();
        if (r) {
          r();
        }
        tokens--;
      }

      if (queue.length === 0) {
        rateLimiterTimeout = undefined;
      } else {
        rateLimiterTimeout = createTimeout();
      }
    }, requestPerInterval);
  }

  async function consumeTokenOrWait(options?: { signal: AbortSignal }) {
    if (tokens > 0) {
      return --tokens;
    }

    return new Promise((resolve) => {
      queue.push(resolve);
      if (options?.signal) {
        options.signal.onabort = function onAbortWaitForNewPolicyAction() {
          queue.splice(queue.indexOf(resolve), 1);
        };
      }

      if (!rateLimiterTimeout) {
        rateLimiterTimeout = createTimeout();
      }
    });
  }

  return { consumeTokenOrWait };
}

function agentPolicyActionState(agentPolicyId: string) {
  const internalSOClient = getInternalUserSOClient();
  const promises: any[] = [];

  let fetchTimeout: NodeJS.Timeout;
  let latestAgentPolicyAction: AgentPolicyAction;

  const configRolloutRateLimiter = rateLimiter(
    appContextService.getConfig()?.fleet.agentPolicyRolloutRateLimitIntervalMs ??
      AGENT_POLICY_ROLLOUT_RATE_LIMIT_INTERVAL_MS,
    appContextService.getConfig()?.fleet.agentPolicyRolloutRateLimitRequestPerInterval ??
      AGENT_POLICY_ROLLOUT_RATE_LIMIT_REQUEST_PER_INTERVAL
  );

  function createFetchTimeout() {
    return setTimeout(async function fetchLatestConfigChange() {
      try {
        const data = await getLatestConfigChangeAction(internalSOClient, agentPolicyId);

        if (!data) {
          throw new Error(`No policy change action for policy ${agentPolicyId}`);
        }

        if (
          !latestAgentPolicyAction ||
          latestAgentPolicyAction.policy_revision < data.policy_revision
        ) {
          const decryptedData = await getAgentPolicyActionByIds(internalSOClient, [data.id]).then(
            (r) => r[0]
          );

          latestAgentPolicyAction = decryptedData;
          for (const p of promises) {
            if (!p.revision || p.revision < latestAgentPolicyAction.policy_revision) {
              if (!p.resolved) {
                p.resolve(latestAgentPolicyAction);
              }
            }
          }
        }
      } catch (err) {
        // TODO log error
        console.log(err);
      }

      if (promises.length > 0) {
        fetchTimeout = createFetchTimeout();
      }
    }, AGENT_UPDATE_ACTIONS_INTERVAL_MS);
  }

  async function waitForNewPolicyAction(revision?: number, options?: { signal: AbortSignal }) {
    if (latestAgentPolicyAction && latestAgentPolicyAction.policy_revision > (revision || 0)) {
      await configRolloutRateLimiter.consumeTokenOrWait(options);

      return latestAgentPolicyAction;
    }

    let p: {
      resolve: (data: any) => void;
      isResolved: () => boolean;
      revision?: number;
    };
    return new Promise((resolve) => {
      p = {
        resolve: (data: any) => {
          isResolved = true;
          resolve(data);
        },
        isResolved: () => isResolved,
      };
      let isResolved = false;
      promises.push({
        resolve: (data: any) => {
          isResolved = true;
          resolve(data);
          promises.splice(promises.indexOf(p), 1);
        },
        isResolved: () => isResolved,
      });

      if (options?.signal) {
        options.signal.onabort = function onAbortWaitForNewPolicyAction() {
          p.resolve(undefined);
        };
      }

      if (!fetchTimeout) {
        fetchTimeout = createFetchTimeout();
      }
    });

    return promise;
  }

  return {
    waitForNewPolicyAction,
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

  const agentPoliciesStates = new Map<string, ReturnType<typeof agentPolicyActionState>>();

  async function subscribeToNewActions2(
    soClient: SavedObjectsClientContract,
    agent: Agent,
    options?: { signal: AbortSignal }
  ): Promise<AgentAction[]> {
    if (!agent.policy_id) {
      throw new Error('Agent does not have a policy');
    }
    const agentPolicyId = agent.policy_id;
    if (!agentPoliciesStates.has(agentPolicyId)) {
      agentPoliciesStates.set(agentPolicyId, agentPolicyActionState(agentPolicyId));
    }
    const agentPolicyState = agentPoliciesStates.get(agentPolicyId);
    if (!agentPolicyState) {
      throw new Error(`Invalid state, no state for policy ${agentPolicyId}`);
    }

    const policyAction = await agentPolicyState.waitForNewPolicyAction(
      agent.policy_revision,
      options
    );
    if (!policyAction) {
      return [];
    }
    const r = await createAgentActionFromPolicyAction(soClient, agent, policyAction);
    return r;
  }

  return {
    subscribeToNewActions2,
  };
}
