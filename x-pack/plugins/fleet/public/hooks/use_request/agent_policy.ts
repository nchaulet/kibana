/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
import { useQuery } from '@tanstack/react-query';

import { agentPolicyRouteService } from '../../services';
import { OLDEST_PUBLIC_VERSION, OLDEST_INTERNAL_VERSION } from '../../../common/constants';

import type {
  GetAgentPoliciesRequest,
  GetAgentPoliciesResponse,
  GetOneAgentPolicyResponse,
  GetFullAgentPolicyResponse,
  CreateAgentPolicyRequest,
  CreateAgentPolicyResponse,
  UpdateAgentPolicyRequest,
  UpdateAgentPolicyResponse,
  CopyAgentPolicyRequest,
  CopyAgentPolicyResponse,
  DeleteAgentPolicyRequest,
  DeleteAgentPolicyResponse,
} from '../../types';

import { useRequest, sendRequest, useConditionalRequest, sendRequestForRq } from './use_request';
import type { SendConditionalRequestConfig, RequestError } from './use_request';

export const useGetAgentPolicies = (query?: GetAgentPoliciesRequest['query']) => {
  return useRequest<GetAgentPoliciesResponse>({
    path: agentPolicyRouteService.getListPath(),
    method: 'get',
    query,
    version: OLDEST_PUBLIC_VERSION,
  });
};

export const useGetAgentPoliciesQuery = (query?: GetAgentPoliciesRequest['query']) => {
  return useQuery<GetAgentPoliciesResponse, RequestError>(['agentPolicies', query], () =>
    sendRequestForRq<GetAgentPoliciesResponse>({
      path: agentPolicyRouteService.getListPath(),
      method: 'get',
      query,
      version: OLDEST_PUBLIC_VERSION,
    })
  );
};

export const sendGetAgentPolicies = (query?: GetAgentPoliciesRequest['query']) => {
  return sendRequest<GetAgentPoliciesResponse>({
    path: agentPolicyRouteService.getListPath(),
    method: 'get',
    query,
    version: OLDEST_PUBLIC_VERSION,
  });
};

export const useGetOneAgentPolicy = (agentPolicyId: string | undefined) => {
  return useConditionalRequest<GetOneAgentPolicyResponse>({
    path: agentPolicyId ? agentPolicyRouteService.getInfoPath(agentPolicyId) : undefined,
    method: 'get',
    shouldSendRequest: !!agentPolicyId,
    version: OLDEST_PUBLIC_VERSION,
  } as SendConditionalRequestConfig);
};

export const useGetOneAgentPolicyFull = (agentPolicyId: string) => {
  return useRequest<GetFullAgentPolicyResponse>({
    path: agentPolicyRouteService.getInfoFullPath(agentPolicyId),
    method: 'get',
    version: OLDEST_PUBLIC_VERSION,
  });
};

export const sendGetOneAgentPolicyFull = (
  agentPolicyId: string,
  query: { standalone?: boolean; kubernetes?: boolean } = {}
) => {
  return sendRequest<GetFullAgentPolicyResponse>({
    path: agentPolicyRouteService.getInfoFullPath(agentPolicyId),
    method: 'get',
    query,
    version: OLDEST_PUBLIC_VERSION,
  });
};

export const sendGetOneAgentPolicy = (agentPolicyId: string) => {
  return sendRequest<GetOneAgentPolicyResponse>({
    path: agentPolicyRouteService.getInfoPath(agentPolicyId),
    method: 'get',
    version: OLDEST_PUBLIC_VERSION,
  });
};

export const sendCreateAgentPolicy = (
  body: CreateAgentPolicyRequest['body'],
  { withSysMonitoring }: { withSysMonitoring: boolean } = { withSysMonitoring: false }
) => {
  return sendRequest<CreateAgentPolicyResponse>({
    path: agentPolicyRouteService.getCreatePath(),
    method: 'post',
    body: JSON.stringify(body),
    query: withSysMonitoring ? { sys_monitoring: true } : {},
    version: OLDEST_PUBLIC_VERSION,
  });
};

export const sendUpdateAgentPolicy = (
  agentPolicyId: string,
  body: UpdateAgentPolicyRequest['body']
) => {
  return sendRequest<UpdateAgentPolicyResponse>({
    path: agentPolicyRouteService.getUpdatePath(agentPolicyId),
    method: 'put',
    body: JSON.stringify(body),
    version: OLDEST_PUBLIC_VERSION,
  });
};

export const sendCopyAgentPolicy = (
  agentPolicyId: string,
  body: CopyAgentPolicyRequest['body']
) => {
  return sendRequest<CopyAgentPolicyResponse>({
    path: agentPolicyRouteService.getCopyPath(agentPolicyId),
    method: 'post',
    body: JSON.stringify(body),
  });
};

export const sendDeleteAgentPolicy = (body: DeleteAgentPolicyRequest['body']) => {
  return sendRequest<DeleteAgentPolicyResponse>({
    path: agentPolicyRouteService.getDeletePath(),
    method: 'post',
    body: JSON.stringify(body),
    version: OLDEST_PUBLIC_VERSION,
  });
};

export const sendResetOnePreconfiguredAgentPolicy = (agentPolicyId: string) => {
  return sendRequest({
    path: agentPolicyRouteService.getResetOnePreconfiguredAgentPolicyPath(agentPolicyId),
    method: 'post',
    body: JSON.stringify({}),
    version: OLDEST_INTERNAL_VERSION,
  });
};

export const sendResetAllPreconfiguredAgentPolicies = () => {
  return sendRequest({
    path: agentPolicyRouteService.getResetAllPreconfiguredAgentPolicyPath(),
    method: 'post',
    body: JSON.stringify({}),
    version: OLDEST_INTERNAL_VERSION,
  });
};
