/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { ToolingLog } from '@kbn/tooling-log';
import { tmpdir } from 'os';
import { writeFile } from 'fs/promises';
import { v4 as uuid } from 'uuid';
import execa from 'execa';
import path from 'path';
import expect from '@kbn/expect';

import { FtrProviderContext } from '../../../api_integration/ftr_provider_context';
import { getLatestVersion } from '../../../fleet_cypress/artifact_manager';
import { skipIfNoDockerRegistry } from '../../helpers';

export default function (providerContext: FtrProviderContext) {
  const { getService } = providerContext;

  const supertest = getService('supertest');
  const es = getService('es');
  const config = getService('config');
  const log = getService('log');

  describe('inputs_with_standalone_docker_agent', () => {
    skipIfNoDockerRegistry(providerContext);
    let apiKey: string;
    let agent: AgentProcess;

    const esHost = `http://host.docker.internal:${config.get('servers.elasticsearch.port')}`;

    before(async () => {
      const res = await es.security.createApiKey({
        name: 'test standalone agent',
      });
      apiKey = `${res.id}:${res.api_key}`;
    });
    afterEach(async () => {
      agent?.stop();
    });
    it('generate a valid config for standalone agents', async () => {
      const pkgName = 'system';
      const { body: pkgRes } = await supertest.get(
        `/api/fleet/epm/packages/${pkgName}?ignoreUnverified=true`
      );
      const { version } = pkgRes.item;

      const res = await supertest.get(
        `/api/fleet/epm/templates/${pkgName}/${version}/inputs?format=yaml&prerelease=false&ignoreUnverified=true`
      );

      const inputsYaml = res.text;

      const policyYaml = `
outputs:
  default:
    type: elasticsearch
    hosts:
      - ${esHost}
    api_key: ${apiKey}
${inputsYaml}
`;

      agent = await startAgent({ log, elasticAgentYaml: policyYaml });

      // Poll for metrics
      const MAX_ITERATIONS = 20;
      let foundMetrics = false;
      for (let i = 0; i < MAX_ITERATIONS; i++) {
        const searchRes = await es.search({
          index: 'metrics-system.cpu-default',
          q: `agent.name:${agent.name}`,
          ignore_unavailable: true,
        });

        // @ts-expect-error TotalHit
        if (searchRes.hits.total.value > 0) {
          foundMetrics = true;
          break;
        }

        await new Promise((resolve) => setTimeout(resolve, 2 * 1000));
      }

      expect(foundMetrics).to.be(true);
    });
  });
}

interface AgentProcess {
  name: string;
  stop: () => void;
}

async function startAgent({
  log,
  elasticAgentYaml,
}: {
  log: ToolingLog;
  elasticAgentYaml: string;
}): Promise<AgentProcess> {
  log.info('Running the agent');

  const artifact = `docker.elastic.co/beats/elastic-agent:${await getLatestVersion()}`;
  log.info(artifact);

  const fileName = `${uuid()}-elastic-agent.yml`;

  const filePath = path.join(tmpdir(), fileName);
  await writeFile(filePath, elasticAgentYaml);
  log.info(filePath);
  const hostName = `test-agent-${Date.now()}`;
  const args = [
    'run',
    '--detach',
    '--name',
    hostName,
    '--net',
    'elastic',
    '--hostname',
    hostName,
    '--add-host',
    'host.docker.internal:host-gateway',
    '--mount',
    `type=bind,source=${filePath},target=/etc/elastic-agent/agent.yml`,
    '--rm',
    artifact,
    '/usr/local/bin/docker-entrypoint',
    '-c',
    '/etc/elastic-agent/agent.yml',
    '-e',
  ];

  const startedContainer = await execa('docker', args);

  log.info(`agent docker container started:\n${JSON.stringify(startedContainer, null, 2)}`);

  const agentContainerId = startedContainer.stdout;

  return {
    name: hostName,
    stop: () => {
      try {
        execa.sync('docker', ['kill', agentContainerId]);
      } catch (err) {
        log.info(`error killing agent docker container ${err.message}`);
      }
    },
  };
}
