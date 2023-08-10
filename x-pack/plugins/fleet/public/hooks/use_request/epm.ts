/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import useAsync from 'react-use/lib/useAsync';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useState } from 'react';

import type { SendRequestResponse } from '@kbn/es-ui-shared-plugin/public';

import { epmRouteService, isVerificationError } from '../../services';
import type {
  GetCategoriesRequest,
  GetCategoriesResponse,
  GetPackagesRequest,
  GetPackagesResponse,
  GetLimitedPackagesResponse,
  GetInfoResponse,
  InstallPackageResponse,
  DeletePackageResponse,
  UpdatePackageRequest,
  UpdatePackageResponse,
  GetBulkAssetsRequest,
  GetBulkAssetsResponse,
  GetVerificationKeyIdResponse,
} from '../../types';
import type { FleetErrorResponse, GetStatsResponse } from '../../../common/types';
import { LATEST_PUBLIC_VERSION } from '../../../common/constants';

import { getCustomIntegrations } from '../../services/custom_integrations';

import { useConfirmOpenUnverified } from '../../applications/integrations/hooks/use_confirm_open_unverified';

import type { RequestError } from './use_request';
import { useRequest, sendRequest, sendRequestForRq } from './use_request';

export function useGetAppendCustomIntegrations() {
  const customIntegrations = getCustomIntegrations();
  return useAsync(customIntegrations.getAppendCustomIntegrations, []);
}

export function useGetReplacementCustomIntegrations() {
  const customIntegrations = getCustomIntegrations();
  return useAsync(customIntegrations.getReplacementCustomIntegrations, []);
}

export function useGetCategoriesQuery(query: GetCategoriesRequest['query'] = {}) {
  return useQuery<GetCategoriesResponse, RequestError>(['categories', query], () =>
    sendRequestForRq<GetCategoriesResponse>({
      path: epmRouteService.getCategoriesPath(),
      method: 'get',
      query,
      version: LATEST_PUBLIC_VERSION,
    })
  );
}

export const sendGetCategories = (query: GetCategoriesRequest['query'] = {}) => {
  return sendRequest<GetCategoriesResponse>({
    path: epmRouteService.getCategoriesPath(),
    method: 'get',
    version: LATEST_PUBLIC_VERSION,
    query,
  });
};

export const useGetPackages = (query: GetPackagesRequest['query'] = {}) => {
  return useRequest<GetPackagesResponse>({
    path: epmRouteService.getListPath(),
    method: 'get',
    version: LATEST_PUBLIC_VERSION,
    query,
  });
};

export const useGetPackagesQuery = (query: GetPackagesRequest['query']) => {
  return useQuery<GetPackagesResponse, RequestError>(['get-packages', query], () =>
    sendRequestForRq<GetPackagesResponse>({
      path: epmRouteService.getListPath(),
      method: 'get',
      version: LATEST_PUBLIC_VERSION,
      query,
    })
  );
};

export const sendGetPackages = (query: GetPackagesRequest['query'] = {}) => {
  return sendRequest<GetPackagesResponse>({
    path: epmRouteService.getListPath(),
    method: 'get',
    version: LATEST_PUBLIC_VERSION,
    query,
  });
};

export const useGetLimitedPackages = () => {
  return useRequest<GetLimitedPackagesResponse>({
    path: epmRouteService.getListLimitedPath(),
    method: 'get',
    version: LATEST_PUBLIC_VERSION,
  });
};

export const useGetPackageInfoByKeyQuery = (
  pkgName: string,
  pkgVersion?: string,
  options?: {
    ignoreUnverified?: boolean;
    prerelease?: boolean;
    full?: boolean;
  },
  // Additional options for the useQuery hook
  queryOptions: {
    // If enabled is false, the query will not be fetched
    enabled?: boolean;
  } = {
    enabled: true,
  }
) => {
  const confirmOpenUnverified = useConfirmOpenUnverified();
  const [ignoreUnverifiedQueryParam, setIgnoreUnverifiedQueryParam] = useState(
    options?.ignoreUnverified
  );

  const response = useQuery<GetInfoResponse, RequestError>(
    [pkgName, pkgVersion, options],
    () =>
      sendRequestForRq<GetInfoResponse>({
        path: epmRouteService.getInfoPath(pkgName, pkgVersion),
        method: 'get',
        version: LATEST_PUBLIC_VERSION,
        query: {
          ...options,
          ...(ignoreUnverifiedQueryParam && { ignoreUnverified: ignoreUnverifiedQueryParam }),
        },
      }),
    { enabled: queryOptions.enabled }
  );

  const confirm = async () => {
    const forceInstall = await confirmOpenUnverified(pkgName);

    if (forceInstall) {
      setIgnoreUnverifiedQueryParam(true);
    }
  };

  if (response?.error && isVerificationError(response?.error)) {
    confirm();
  }

  return response;
};

export const useGetPackageStats = (pkgName: string) => {
  return useRequest<GetStatsResponse>({
    path: epmRouteService.getStatsPath(pkgName),
    method: 'get',
    version: LATEST_PUBLIC_VERSION,
  });
};

export const useGetPackageVerificationKeyId = () => {
  const { data, ...rest } = useQuery<GetVerificationKeyIdResponse, RequestError>(
    ['verification_key_id'],
    () =>
      sendRequestForRq<GetVerificationKeyIdResponse>({
        path: epmRouteService.getVerificationKeyIdPath(),
        method: 'get',
        version: LATEST_PUBLIC_VERSION,
      })
  );

  return {
    packageVerificationKeyId: data?.id || undefined,
    ...rest,
  };
};

export const sendGetPackageInfoByKey = (
  pkgName: string,
  pkgVersion?: string,
  options?: {
    ignoreUnverified?: boolean;
    prerelease?: boolean;
    full?: boolean;
  }
) => {
  return sendRequest<GetInfoResponse>({
    path: epmRouteService.getInfoPath(pkgName, pkgVersion),
    method: 'get',
    version: LATEST_PUBLIC_VERSION,
    query: options,
  });
};

export const useGetFileByPath = (filePath: string) => {
  return useRequest<string>({
    path: epmRouteService.getFilePath(filePath),
    method: 'get',
    version: LATEST_PUBLIC_VERSION,
  });
};

export const useGetFileByPathQuery = (filePath: string) => {
  return useQuery<SendRequestResponse<string>, RequestError>(['get-file', filePath], () =>
    sendRequest<string>({
      path: epmRouteService.getFilePath(filePath),
      method: 'get',
      version: LATEST_PUBLIC_VERSION,
    })
  );
};

export const sendGetFileByPath = (filePath: string) => {
  return sendRequest<string>({
    path: epmRouteService.getFilePath(filePath),
    method: 'get',
    version: LATEST_PUBLIC_VERSION,
  });
};

export const sendInstallPackage = (pkgName: string, pkgVersion: string, force: boolean = false) => {
  const body = force ? { force } : undefined;
  return sendRequest<InstallPackageResponse, FleetErrorResponse>({
    path: epmRouteService.getInstallPath(pkgName, pkgVersion),
    method: 'post',
    version: LATEST_PUBLIC_VERSION,
    body,
  });
};

export const sendBulkInstallPackages = (
  packages: Array<string | { name: string; version: string }>
) => {
  return sendRequest<InstallPackageResponse, FleetErrorResponse>({
    path: epmRouteService.getBulkInstallPath(),
    method: 'post',
    version: LATEST_PUBLIC_VERSION,
    body: {
      packages,
    },
  });
};

export const sendRemovePackage = (pkgName: string, pkgVersion: string, force: boolean = false) => {
  return sendRequest<DeletePackageResponse>({
    path: epmRouteService.getRemovePath(pkgName, pkgVersion),
    method: 'delete',
    version: LATEST_PUBLIC_VERSION,
    body: {
      force,
    },
  });
};

export const sendRequestReauthorizeTransforms = (
  pkgName: string,
  pkgVersion: string,
  transforms: Array<{ transformId: string }>
) => {
  return sendRequest<InstallPackageResponse, FleetErrorResponse>({
    path: epmRouteService.getReauthorizeTransformsPath(pkgName, pkgVersion),
    method: 'post',
    version: LATEST_PUBLIC_VERSION,
    body: { transforms },
  });
};

interface UpdatePackageArgs {
  pkgName: string;
  pkgVersion: string;
  body: UpdatePackageRequest['body'];
}

export const useUpdatePackageMutation = () => {
  return useMutation<UpdatePackageResponse, RequestError, UpdatePackageArgs>(
    ({ pkgName, pkgVersion, body }: UpdatePackageArgs) =>
      sendRequestForRq<UpdatePackageResponse>({
        path: epmRouteService.getUpdatePath(pkgName, pkgVersion),
        method: 'put',
        version: LATEST_PUBLIC_VERSION,
        body,
      })
  );
};

export const sendUpdatePackage = (
  pkgName: string,
  pkgVersion: string,
  body: UpdatePackageRequest['body']
) => {
  return sendRequest<UpdatePackageResponse>({
    path: epmRouteService.getUpdatePath(pkgName, pkgVersion),
    method: 'put',
    version: LATEST_PUBLIC_VERSION,
    body,
  });
};

export const sendGetBulkAssets = (body: GetBulkAssetsRequest['body']) => {
  return sendRequest<GetBulkAssetsResponse>({
    path: epmRouteService.getBulkAssetsPath(),
    method: 'post',
    version: LATEST_PUBLIC_VERSION,
    body,
  });
};
