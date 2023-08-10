/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { PostHealthCheckRequest, PostHealthCheckResponse } from '../../types';
import { appRoutesService } from '../../services';
import { LATEST_PUBLIC_VERSION } from '../../../common/constants';

import { sendRequest } from './use_request';

export function sendPostHealthCheck(body: PostHealthCheckRequest['body']) {
  return sendRequest<PostHealthCheckResponse>({
    method: 'post',
    path: appRoutesService.postHealthCheckPath(),
    version: LATEST_PUBLIC_VERSION,
    body,
  });
}
