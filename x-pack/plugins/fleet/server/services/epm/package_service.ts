/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

/* eslint-disable max-classes-per-file */

import type { KibanaRequest, ElasticsearchClient, SavedObjectsClient, Logger } from 'kibana/server';

import type {
  EsAssetReference,
  InstallablePackage,
  RegistryPackage,
  RegistrySearchResult,
} from '../../types';
import { ElasticsearchAssetType } from '../../types';
import { checkSuperuser } from '../../routes/security';
import { FleetUnauthorizedError } from '../../errors';

import { getPathParts } from './archive';
import { installTransform } from './elasticsearch/transform/install';
import { fetchFindLatestPackage, getRegistryPackage } from './registry';

export type InstalledAssetType = EsAssetReference;

export interface PackageService {
  asScoped(request: KibanaRequest): PackageClient;
  asInternalUser: PackageClient;
}

const isTransform = (path: string) => {
  const pathParts = getPathParts(path);
  return !path.endsWith('/') && pathParts.type === ElasticsearchAssetType.transform;
};

export interface PackageClient {
  fetchFindLatestPackage(packageName: string): Promise<RegistrySearchResult>;

  getRegistryPackage(
    packageName: string,
    packageVersion: string
  ): Promise<{ packageInfo: RegistryPackage; paths: string[] }>;

  reinstallEsAssets(
    packageInfo: InstallablePackage,
    assetsPaths: string[]
  ): Promise<InstalledAssetType[]>;
}

export class PackageServiceImpl implements PackageService {
  constructor(
    private readonly internalEsClient: ElasticsearchClient,
    private readonly internalSoClient: SavedObjectsClient,
    private readonly logger: Logger
  ) {}

  public asScoped(request: KibanaRequest) {
    const preflightCheck = () => {
      if (!checkSuperuser(request)) {
        throw new FleetUnauthorizedError(
          `User does not have adequate permissions to access Fleet agents.`
        );
      }
    };

    return new PackageClientImpl(
      this.internalEsClient,
      this.internalSoClient,
      this.logger,
      preflightCheck
    );
  }

  public get asInternalUser() {
    return new PackageClientImpl(this.internalEsClient, this.internalSoClient, this.logger);
  }
}

class PackageClientImpl implements PackageClient {
  constructor(
    private readonly internalEsClient: ElasticsearchClient,
    private readonly internalSoClient: SavedObjectsClient,
    private readonly logger: Logger,
    private readonly preflightCheck?: () => void | Promise<void>
  ) {}

  public async fetchFindLatestPackage(packageName: string) {
    await this.#runPreflight();
    return fetchFindLatestPackage(packageName);
  }

  public async getRegistryPackage(packageName: string, packageVersion: string) {
    await this.#runPreflight();
    return getRegistryPackage(packageName, packageVersion);
  }

  public async reinstallEsAssets(
    packageInfo: InstallablePackage,
    assetsPaths: string[]
  ): Promise<InstalledAssetType[]> {
    await this.#runPreflight();
    let installedAssets: InstalledAssetType[] = [];

    const transformPaths = assetsPaths.filter((path) => isTransform(path));

    if (transformPaths.length !== assetsPaths.length) {
      throw new Error('reinstallEsAssets is currently only implemented for transform assets');
    }

    if (transformPaths.length > 0) {
      installedAssets = installedAssets.concat(
        await this.#reinstallTransforms(packageInfo, transformPaths)
      );
    }

    return installedAssets;
  }

  #reinstallTransforms(packageInfo: InstallablePackage, paths: string[]) {
    const transformPaths = paths.filter((path) => {
      if (!path.endsWith('/')) return false;
      const { type } = getPathParts(path);
      return type === ElasticsearchAssetType.transform;
    });
    return installTransform(
      packageInfo,
      transformPaths,
      this.internalEsClient,
      this.internalSoClient,
      this.logger
    );
  }

  #runPreflight() {
    if (this.preflightCheck) {
      return this.preflightCheck();
    }
  }
}
