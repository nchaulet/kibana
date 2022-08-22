/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { memo } from 'react';
import { EuiFlexGroup, EuiFlexItem, EuiTitle } from '@elastic/eui';
import { FormattedMessage } from '@kbn/i18n-react';
import { TimeRange } from '@kbn/es-query';
import { SecuritySolutionDataViewBase } from '../../../../types';
import { RawIndicatorFieldId } from '../../../../../common/types/indicator';
import { useAggregatedIndicators } from '../../hooks/use_aggregated_indicators';
import { IndicatorsFieldSelector } from '../indicators_field_selector/indicators_field_selector';
import { IndicatorsBarChart } from '../indicators_barchart/indicators_barchart';

const DEFAULT_FIELD = RawIndicatorFieldId.Feed;

export interface IndicatorsBarChartWrapperProps {
  timeRange?: TimeRange;
  indexPattern: SecuritySolutionDataViewBase;
}

export const IndicatorsBarChartWrapper = memo<IndicatorsBarChartWrapperProps>(
  ({ timeRange, indexPattern }) => {
    const { dateRange, indicators, onFieldChange } = useAggregatedIndicators({ timeRange });

    return (
      <>
        <EuiFlexGroup justifyContent={'spaceBetween'}>
          <EuiFlexItem>
            <EuiTitle size={'s'}>
              <h2>
                <FormattedMessage
                  id="xpack.threatIntelligence.indicator.barchartSection.title"
                  defaultMessage="Trend"
                />
              </h2>
            </EuiTitle>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <IndicatorsFieldSelector
              indexPattern={indexPattern}
              defaultStackByValue={DEFAULT_FIELD}
              valueChange={onFieldChange}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
        {timeRange ? <IndicatorsBarChart indicators={indicators} dateRange={dateRange} /> : <></>}
      </>
    );
  }
);
