/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { SavedObjectsClientContract } from 'kibana/server';
import { Agent, AgentSOAttributes } from '../../types';
import { AGENT_SAVED_OBJECT_TYPE } from '../../constants';

export async function acknowledgeAgentActions(
  soClient: SavedObjectsClientContract,
  agent: Agent,
  actionIds: string[]
) {
  const now = new Date().toISOString();

  const updatedActions = agent.actions.map(action => {
    if (action.sent_at) {
      return action;
    }
    return { ...action, sent_at: actionIds.indexOf(action.id) >= 0 ? now : undefined };
  });

  const configRevision = updatedActions.reduce((acc, action) => {
    if (action.type !== 'CONFIG_CHANGE') {
      return acc;
    }
    const data = action.data ? JSON.parse(action.data as string) : {};

    if (data.config.id !== agent.config_id) {
      return acc;
    }

    return data.config.revision > acc ? data.config.revision : acc;
  }, agent.config_revision || 0);

  await soClient.update<AgentSOAttributes>(AGENT_SAVED_OBJECT_TYPE, agent.id, {
    actions: updatedActions,
    config_revision: configRevision,
  });
}
