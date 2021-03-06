/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { i18n } from '@kbn/i18n';
import { DefaultEditorSize } from 'ui/vis/editor_size';
import { Status } from 'ui/vis/update_status';
import { defaultFeedbackMessage } from 'ui/vis/default_feedback_message';

import { createVegaRequestHandler } from './vega_request_handler';
import { createVegaVisualization } from './vega_visualization';

import vegaEditorTemplate from './vega_editor_template.html';
import defaultSpec from '!!raw-loader!./default.spec.hjson';

import { visFactory } from '../../visualizations/public';

export const createVegaTypeDefinition = (dependencies) => {
  const requestHandler = createVegaRequestHandler(dependencies);
  const visualization = createVegaVisualization(dependencies);

  return visFactory.createBaseVisualization({
    name: 'vega',
    title: 'Vega',
    description: i18n.translate('visTypeVega.type.vegaDescription', {
      defaultMessage: 'Create custom visualizations using Vega and Vega-Lite',
      description: 'Vega and Vega-Lite are product names and should not be translated',
    }),
    icon: 'visVega',
    visConfig: { defaults: { spec: defaultSpec } },
    editorConfig: {
      optionsTemplate: vegaEditorTemplate,
      enableAutoApply: true,
      defaultSize: DefaultEditorSize.MEDIUM,
    },
    visualization,
    requestHandler,
    requiresUpdateStatus: [Status.DATA, Status.RESIZE],
    responseHandler: 'none',
    options: {
      showIndexSelection: false,
      showQueryBar: true,
      showFilterBar: true,
    },
    stage: 'experimental',
    feedbackMessage: defaultFeedbackMessage,
  });
};
