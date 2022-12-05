/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useCallback } from 'react';

import { FormattedMessage } from '@kbn/i18n-react';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiSwitch,
  EuiText,
  EuiSpacer,
  EuiTitle,
  EuiToolTip,
} from '@elastic/eui';

import type {
  ExperimentalDataStreamFeature,
  RegistryStreamWithDataStream,
} from '../../../../../../../../../common/types';
import { getRegistryDataStreamAssetBaseName } from '../../../../../../../../../common/services';
import type { ExperimentalIndexingFeature } from '../../../../../../../../../common/types/models/epm';

interface Props {
  registryDataStream: RegistryStreamWithDataStream['data_stream'];
  experimentalDataFeatures?: ExperimentalDataStreamFeature[];
  setNewExperimentalDataFeatures: (
    experimentalDataFeatures: ExperimentalDataStreamFeature[]
  ) => void;
}

export const ExperimentDatastreamSettings: React.FunctionComponent<Props> = ({
  registryDataStream,
  experimentalDataFeatures,
  setNewExperimentalDataFeatures,
}) => {
  const getExperimentalFeatureValue = useCallback(
    (feature: ExperimentalIndexingFeature) => {
      return experimentalDataFeatures?.find(
        ({ data_stream: dataStream, features }) =>
          dataStream === getRegistryDataStreamAssetBaseName(registryDataStream) &&
          typeof features[feature] !== 'undefined'
      )?.features?.[feature];
    },
    [experimentalDataFeatures, registryDataStream]
  );

  const isSyntheticSourceEditable = registryDataStream.elasticsearch?.source_mode !== 'default';

  const syntheticSourceExperimentalValue = getExperimentalFeatureValue('synthetic_source');
  const isSyntheticSourceEnabledByDefault =
    registryDataStream.elasticsearch?.source_mode === 'synthetic';

  const newExperimentalIndexingFeature = {
    synthetic_source:
      typeof syntheticSourceExperimentalValue !== 'undefined'
        ? syntheticSourceExperimentalValue
        : isSyntheticSourceEnabledByDefault,
    tsdb: getExperimentalFeatureValue('tsdb') ?? false,
  };

  const onIndexingSettingChange = (
    features: Partial<Record<ExperimentalIndexingFeature, boolean>>
  ) => {
    const newExperimentalDataStreamFeatures = [...(experimentalDataFeatures ?? [])];

    const dataStream = getRegistryDataStreamAssetBaseName(registryDataStream);

    const existingSettingRecord = newExperimentalDataStreamFeatures.find(
      (x) => x.data_stream === dataStream
    );

    if (existingSettingRecord) {
      existingSettingRecord.features = {
        ...existingSettingRecord.features,
        ...features,
      };
    } else {
      newExperimentalDataStreamFeatures.push({
        data_stream: dataStream,
        features: { ...newExperimentalIndexingFeature, ...features },
      });
    }

    setNewExperimentalDataFeatures(newExperimentalDataStreamFeatures);
  };

  return (
    <EuiFlexItem>
      <EuiFlexGroup direction="column" gutterSize="xs">
        <EuiFlexItem grow={false}>
          <EuiTitle size="xxxs">
            <h5>
              <FormattedMessage
                id="xpack.fleet.packagePolicyEditor.experimentalSettings.title"
                defaultMessage="Indexing settings (experimental)"
              />
            </h5>
          </EuiTitle>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText color="subdued" size="xs">
            <FormattedMessage
              id="xpack.fleet.createPackagePolicy.stepConfigure.experimentalFeaturesDescription"
              defaultMessage="Select data streams to configure indexing options. This is an {experimentalFeature} and may have effects on other properties."
              values={{
                experimentalFeature: (
                  <strong>
                    <FormattedMessage
                      id="xpack.fleet.createPackagePolicy.experimentalFeatureText"
                      defaultMessage="experimental feature"
                    />
                  </strong>
                ),
              }}
            />
          </EuiText>
        </EuiFlexItem>
        <EuiSpacer size="s" />
        <EuiFlexItem>
          <EuiSwitch
            checked={newExperimentalIndexingFeature.synthetic_source ?? false}
            disabled={!isSyntheticSourceEditable}
            label={
              <FormattedMessage
                id="xpack.fleet.createPackagePolicy.experimentalFeatures.syntheticSourceLabel"
                defaultMessage="Synthetic source"
              />
            }
            onChange={(e) => {
              onIndexingSettingChange({
                synthetic_source: e.target.checked,
              });
            }}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiToolTip
            content={
              <FormattedMessage
                id="xpack.fleet.createPackagePolicy.experimentalFeatures.TSDBTooltip"
                defaultMessage="Enabling this feature is irreversible"
              />
            }
          >
            <EuiSwitch
              disabled={newExperimentalIndexingFeature.tsdb ?? false}
              checked={newExperimentalIndexingFeature.tsdb ?? false}
              label={
                <FormattedMessage
                  id="xpack.fleet.createPackagePolicy.experimentalFeatures.TSDBLabel"
                  defaultMessage="Time-series indexing (TSDB)"
                />
              }
              onChange={(e) => {
                onIndexingSettingChange({
                  tsdb: e.target.checked,
                });
              }}
            />
          </EuiToolTip>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFlexItem>
  );
};
