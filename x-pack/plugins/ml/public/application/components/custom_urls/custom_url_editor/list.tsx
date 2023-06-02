/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { FC, useState, ChangeEvent } from 'react';

import {
  EuiButtonIcon,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiToolTip,
  EuiTextArea,
  EuiSpacer,
} from '@elastic/eui';

import { i18n } from '@kbn/i18n';
import { FormattedMessage } from '@kbn/i18n-react';
import type { MlUrlConfig, MlKibanaUrlConfig } from '@kbn/ml-anomaly-utils';
import type { DataFrameAnalyticsConfig } from '@kbn/ml-data-frame-analytics-utils';

import { useMlKibana } from '../../../contexts/kibana';
import { isValidLabel, openCustomUrlWindow } from '../../../util/custom_url_utils';
import { getTestUrl } from './utils';

import { parseInterval } from '../../../../../common/util/parse_interval';
import { TIME_RANGE_TYPE } from './constants';
import { Job, isAnomalyDetectionJob } from '../../../../../common/types/anomaly_detection_jobs';

function isValidTimeRange(timeRange: MlKibanaUrlConfig['time_range']): boolean {
  // Allow empty timeRange string, which gives the 'auto' behaviour.
  if (timeRange === undefined || timeRange.length === 0 || timeRange === TIME_RANGE_TYPE.AUTO) {
    return true;
  }

  const interval = parseInterval(timeRange);
  return interval !== null;
}

export interface CustomUrlListProps {
  job: Job | DataFrameAnalyticsConfig;
  customUrls: MlUrlConfig[];
  onChange: (customUrls: MlUrlConfig[]) => void;
}

/*
 * React component for listing the custom URLs added to a job,
 * with buttons for testing and deleting each custom URL.
 */
export const CustomUrlList: FC<CustomUrlListProps> = ({
  job,
  customUrls,
  onChange: setCustomUrls,
}) => {
  const {
    services: { http, notifications },
  } = useMlKibana();
  const [expandedUrlIndex, setExpandedUrlIndex] = useState<number | null>(null);

  const onLabelChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    if (index < customUrls.length) {
      customUrls[index] = {
        ...customUrls[index],
        url_name: e.target.value,
      };
      setCustomUrls([...customUrls]);
    }
  };

  const onUrlValueChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number
  ) => {
    if (index < customUrls.length) {
      customUrls[index] = {
        ...customUrls[index],
        url_value: e.target.value,
      };
      setCustomUrls([...customUrls]);
    }
  };

  const onTimeRangeChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    if (index < customUrls.length) {
      customUrls[index] = {
        ...customUrls[index],
      };

      const timeRange = e.target.value;
      if (timeRange !== undefined && timeRange.length > 0) {
        (customUrls[index] as MlKibanaUrlConfig).time_range = timeRange;
      } else {
        delete (customUrls[index] as MlKibanaUrlConfig).time_range;
      }
      setCustomUrls([...customUrls]);
    }
  };

  const onDeleteButtonClick = (index: number) => {
    if (index < customUrls.length) {
      customUrls.splice(index, 1);
      setCustomUrls([...customUrls]);
    }
  };

  const onTestButtonClick = (index: number) => {
    if (index < customUrls.length) {
      getTestUrl(job, customUrls[index])
        .then((testUrl) => {
          openCustomUrlWindow(testUrl, customUrls[index], http.basePath.get());
        })
        .catch((resp) => {
          // eslint-disable-next-line no-console
          console.error('Error obtaining URL for test:', resp);

          const { toasts } = notifications;
          toasts.addDanger(
            i18n.translate(
              'xpack.ml.customUrlEditorList.obtainingUrlToTestConfigurationErrorMessage',
              {
                defaultMessage: 'An error occurred obtaining the URL to test the configuration',
              }
            )
          );
        });
    }
  };

  const customUrlRows = customUrls.map((customUrl, index) => {
    // Validate the label.
    const label = customUrl.url_name;
    const otherUrls = [...customUrls];
    otherUrls.splice(index, 1); // Don't compare label with itself.
    const isInvalidLabel = !isValidLabel(label, otherUrls);
    const invalidLabelError = isInvalidLabel
      ? [
          i18n.translate('xpack.ml.customUrlEditorList.labelIsNotUniqueErrorMessage', {
            defaultMessage: 'A unique label must be supplied',
          }),
        ]
      : [];

    // Validate the time range.
    const timeRange = (customUrl as MlKibanaUrlConfig).time_range;
    const isInvalidTimeRange = !isValidTimeRange(timeRange);
    const invalidIntervalError = isInvalidTimeRange
      ? [
          i18n.translate('xpack.ml.customUrlEditorList.invalidTimeRangeFormatErrorMessage', {
            defaultMessage: 'Invalid format',
          }),
        ]
      : [];

    return (
      <>
        <EuiFlexGroup key={`url_${index}`} data-test-subj={`mlJobEditCustomUrlItem_${index}`}>
          <EuiFlexItem grow={false}>
            <EuiFormRow
              label={
                <FormattedMessage
                  id="xpack.ml.customUrlEditorList.labelLabel"
                  defaultMessage="Label"
                />
              }
              isInvalid={isInvalidLabel}
              error={invalidLabelError}
              data-test-subj="mlJobEditCustomUrlItemLabel"
            >
              <EuiFieldText
                value={label}
                isInvalid={isInvalidLabel}
                onChange={(e) => onLabelChange(e, index)}
                data-test-subj={`mlJobEditCustomUrlLabelInput_${index}`}
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow
              fullWidth={true}
              label={
                <FormattedMessage id="xpack.ml.customUrlEditorList.urlLabel" defaultMessage="URL" />
              }
            >
              {index === expandedUrlIndex ? (
                <EuiTextArea
                  inputRef={(input: HTMLTextAreaElement | null) => {
                    if (input) {
                      input.focus();
                    }
                  }}
                  fullWidth={true}
                  value={customUrl.url_value}
                  onChange={(e) => onUrlValueChange(e, index)}
                  onBlur={() => {
                    setExpandedUrlIndex(null);
                  }}
                  data-test-subj={`mlJobEditCustomUrlTextarea_${index}`}
                />
              ) : (
                <EuiFieldText
                  fullWidth={true}
                  value={customUrl.url_value}
                  readOnly={true}
                  onFocus={() => setExpandedUrlIndex(index)}
                  data-test-subj={`mlJobEditCustomUrlInput_${index}`}
                />
              )}
            </EuiFormRow>
          </EuiFlexItem>
          {isAnomalyDetectionJob(job) ? (
            <EuiFlexItem grow={false}>
              <EuiFormRow
                label={
                  <FormattedMessage
                    id="xpack.ml.customUrlEditorList.timeRangeLabel"
                    defaultMessage="Time range"
                  />
                }
                error={invalidIntervalError}
                isInvalid={isInvalidTimeRange}
              >
                <EuiFieldText
                  value={(customUrl as MlKibanaUrlConfig).time_range || ''}
                  isInvalid={isInvalidTimeRange}
                  placeholder={TIME_RANGE_TYPE.AUTO}
                  onChange={(e) => onTimeRangeChange(e, index)}
                />
              </EuiFormRow>
            </EuiFlexItem>
          ) : null}
          <EuiFlexItem grow={false}>
            <EuiFormRow hasEmptyLabelSpace>
              <EuiToolTip
                content={
                  <FormattedMessage
                    id="xpack.ml.customUrlEditorList.testCustomUrlTooltip"
                    defaultMessage="Test custom URL"
                  />
                }
              >
                <EuiButtonIcon
                  size="s"
                  color="primary"
                  onClick={() => onTestButtonClick(index)}
                  iconType="popout"
                  aria-label={i18n.translate(
                    'xpack.ml.customUrlEditorList.testCustomUrlAriaLabel',
                    {
                      defaultMessage: 'Test custom URL',
                    }
                  )}
                  data-test-subj="mlJobEditTestCustomUrlButton"
                />
              </EuiToolTip>
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiFormRow hasEmptyLabelSpace>
              <EuiToolTip
                content={
                  <FormattedMessage
                    id="xpack.ml.customUrlEditorList.deleteCustomUrlTooltip"
                    defaultMessage="Delete custom URL"
                  />
                }
              >
                <EuiButtonIcon
                  size="s"
                  color="danger"
                  onClick={() => onDeleteButtonClick(index)}
                  iconType="trash"
                  aria-label={i18n.translate(
                    'xpack.ml.customUrlEditorList.deleteCustomUrlAriaLabel',
                    {
                      defaultMessage: 'Delete custom URL',
                    }
                  )}
                  data-test-subj={`mlJobEditDeleteCustomUrlButton_${index}`}
                />
              </EuiToolTip>
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="m" />
      </>
    );
  });

  return <div data-test-subj="mlJobEditCustomUrlsList">{customUrlRows}</div>;
};
