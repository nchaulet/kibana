/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { RequestHandler } from '@kbn/core/server';
import type { TypeOf } from '@kbn/config-schema';
import fetch from 'node-fetch';

import { APP_API_ROUTES } from '../../constants';
import { agentPolicyService, appContextService } from '../../services';
import type { CheckPermissionsResponse, GenerateServiceTokenResponse } from '../../../common/types';
import { defaultFleetErrorHandler, GenerateServiceTokenError } from '../../errors';
import type { FleetAuthzRouter } from '../security';
import type { FleetRequestHandler } from '../../types';
import { CheckPermissionsRequestSchema } from '../../types';
import { createAgentPolicyWithPackages } from '../../services/agent_policy_create';
import { createFleetServerHost } from '../../services/fleet_server_host';
import { outputService } from '../../services/output';

export const getCheckPermissionsHandler: FleetRequestHandler<
  unknown,
  TypeOf<typeof CheckPermissionsRequestSchema.query>
> = async (context, request, response) => {
  const missingSecurityBody: CheckPermissionsResponse = {
    success: false,
    error: 'MISSING_SECURITY',
  };

  if (!appContextService.getSecurityLicense().isEnabled()) {
    return response.ok({ body: missingSecurityBody });
  } else {
    const fleetContext = await context.fleet;
    if (!fleetContext.authz.fleet.all) {
      return response.ok({
        body: {
          success: false,
          error: 'MISSING_PRIVILEGES',
        } as CheckPermissionsResponse,
      });
    }
    // check the manage_service_account cluster privilege
    else if (request.query.fleetServerSetup) {
      const esClient = (await context.core).elasticsearch.client.asCurrentUser;
      const { has_all_requested: hasAllPrivileges } = await esClient.security.hasPrivileges({
        body: { cluster: ['manage_service_account'] },
      });

      if (!hasAllPrivileges) {
        return response.ok({
          body: {
            success: false,
            error: 'MISSING_FLEET_SERVER_SETUP_PRIVILEGES',
          } as CheckPermissionsResponse,
        });
      }
    }

    return response.ok({ body: { success: true } as CheckPermissionsResponse });
  }
};

export const generateServiceTokenHandler: RequestHandler = async (context, request, response) => {
  // Generate the fleet server service token as the current user as the internal user do not have the correct permissions
  const esClient = (await context.core).elasticsearch.client.asCurrentUser;
  try {
    const tokenResponse = await esClient.transport.request<{
      created?: boolean;
      token?: GenerateServiceTokenResponse;
    }>({
      method: 'POST',
      path: `_security/service/elastic/fleet-server/credential/token/token-${Date.now()}`,
    });

    if (tokenResponse.created && tokenResponse.token) {
      const body: GenerateServiceTokenResponse = tokenResponse.token;
      return response.ok({
        body,
      });
    } else {
      const error = new GenerateServiceTokenError('Unable to generate service token');
      return defaultFleetErrorHandler({ error, response });
    }
  } catch (e) {
    const error = new GenerateServiceTokenError(e);
    return defaultFleetErrorHandler({ error, response });
  }
};

export const registerRoutes = (router: FleetAuthzRouter) => {
  router.get(
    {
      path: APP_API_ROUTES.CHECK_PERMISSIONS_PATTERN,
      validate: CheckPermissionsRequestSchema,
      options: { tags: [] },
    },
    getCheckPermissionsHandler
  );

  router.post(
    {
      path: APP_API_ROUTES.GENERATE_SERVICE_TOKEN_PATTERN,
      validate: {},
      fleetAuthz: {
        fleet: { all: true },
      },
    },
    generateServiceTokenHandler
  );

  router.post(
    {
      path: APP_API_ROUTES.GENERATE_SERVICE_TOKEN_PATTERN_DEPRECATED,
      validate: {},
      fleetAuthz: {
        fleet: { all: true },
      },
    },
    generateServiceTokenHandler
  );

  router.post(
    {
      path: '/api/fleet/enable_fleet_service',
      validate: false,
      fleetAuthz: {
        fleet: { setup: true },
      },
    },
    async (context, req, response) => {
      try {
        const coreContext = await context.core;
        const fleetContext = await context.fleet;
        const soClient = fleetContext.epm.internalSoClient;
        const esClient = coreContext.elasticsearch.client.asInternalUser;
        const userEsClient = coreContext.elasticsearch.client.asCurrentUser;

        const fleetServerPolicy = await agentPolicyService
          .get(soClient, 'fleet-server-policy', false)
          .catch((err) => {
            if (!err.isBoom || err.output.statusCode !== 404) {
              throw err;
            }
          });

        // Create fleet server policy if needed
        if (!fleetServerPolicy) {
          await createAgentPolicyWithPackages({
            esClient,
            soClient,
            newPolicy: {
              name: 'Fleet server',
              namespace: 'default',
            },
            withSysMonitoring: false,
            spaceId: fleetContext.spaceId,
            hasFleetServer: true,
          });
        }

        const tokenResponse = await userEsClient.transport.request<{
          created?: boolean;
          token?: GenerateServiceTokenResponse;
        }>({
          method: 'POST',
          path: `_security/service/elastic/fleet-server/credential/token/token-${Date.now()}`,
        });

        const output = await outputService.get(
          soClient,
          // @ts-ignore-error
          await outputService.getDefaultDataOutputId(soClient)
        );

        const deploymentName = `deployment${Date.now()}`;
        const res = await fetch('http://api.fleet.elastic.test/fleet-server-deployments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            service_account_token: tokenResponse.token?.value,
            deployment_name: deploymentName,
            elasticsearch_host: output.hosts?.[0],
          }),
        });

        console.log(await res.text(), tokenResponse.token);

        await createFleetServerHost(soClient, {
          host_urls: [`https://${deploymentName}.fleet.elastic.test`],
          is_default: true,
          name: `Fleet server ${deploymentName}`,
          is_preconfigured: false,
        });

        return response.ok({
          body: {
            message: 'done',
          },
        });
      } catch (error) {
        return defaultFleetErrorHandler({ error, response });
      }
    }
  );
};
