/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import expect from '@kbn/expect';
import { FtrProviderContext } from '../../api_integration/ftr_provider_context';
import { skipIfNoDockerRegistry } from '../helpers';
import { setupFleetAndAgents } from './agents/services';

export default function (providerContext: FtrProviderContext) {
  const { getService } = providerContext;
  const supertest = getService('supertest');
  const es = getService('es');
  const esArchiver = getService('esArchiver');

  let agentCount = 0;
  async function generateAgent(status: string, policyId: string) {
    let data: any = {};

    switch (status) {
      case 'unhealthy':
        data = { last_checkin_status: 'error' };
        break;
      case 'offline':
        data = { last_checkin: '2017-06-07T18:59:04.498Z' };
        break;
      default:
        data = { last_checkin: new Date().toISOString() };
    }

    await es.index({
      index: '.fleet-agents',
      body: {
        id: `agent-${++agentCount}`,
        active: true,
        last_checkin: new Date().toISOString(),
        policy_id: policyId,
        policy_revision: 1,
        ...data,
      },
      refresh: 'wait_for',
    });
  }

  describe('fleet_telemetry', () => {
    skipIfNoDockerRegistry(providerContext);
    before(async () => {
      await esArchiver.load('empty_kibana');
      await esArchiver.load('fleet/empty_fleet_server');
    });

    setupFleetAndAgents(providerContext);

    after(async () => {
      await esArchiver.unload('empty_kibana');
      await esArchiver.unload('fleet/empty_fleet_server');
    });

    before(async () => {
      // Get FleetServer policy id
      const { body: apiResponse } = await supertest.get(`/api/fleet/agent_policies`).expect(200);
      const defaultFleetServerPolicy = apiResponse.items.find(
        (item: any) => item.is_default_fleet_server
      );

      const defaultServerPolicy = apiResponse.items.find((item: any) => item.is_default);

      if (!defaultFleetServerPolicy) {
        throw new Error('No default Fleet server policy');
      }

      if (!defaultServerPolicy) {
        throw new Error('No default policy');
      }

      await supertest
        .put(`/api/fleet/settings`)
        .set('kbn-xsrf', 'xxxx')
        .send({ fleet_server_hosts: ['https://test1.fr', 'https://test2.fr'] })
        .expect(200);

      // Default Fleet Server
      await generateAgent('healthy', defaultFleetServerPolicy.id);
      await generateAgent('healthy', defaultFleetServerPolicy.id);
      await generateAgent('unhealthy', defaultFleetServerPolicy.id);

      // Default policy
      await generateAgent('healthy', defaultServerPolicy.id);
      await generateAgent('offline', defaultServerPolicy.id);
      await generateAgent('unhealthy', defaultServerPolicy.id);
    });

    it('should return the correct telemetry values for fleet', async () => {
      const {
        body: [apiResponse],
      } = await supertest
        .post(`/api/telemetry/v2/clusters/_stats`)
        .set('kbn-xsrf', 'xxxx')
        .send({
          unencrypted: true,
        })
        .expect(200);

      expect(apiResponse.stack_stats.kibana.plugins.fleet.agents).eql({
        total_enrolled: 6,
        healthy: 3,
        unhealthy: 2,
        offline: 1,
        updating: 0,
        total_all_statuses: 6,
      });

      expect(apiResponse.stack_stats.kibana.plugins.fleet.fleet_server).eql({
        total_all_statuses: 3,
        total_enrolled: 3,
        healthy: 2,
        unhealthy: 1,
        offline: 0,
        updating: 0,
        num_host_urls: 2,
      });
    });
  });
}
