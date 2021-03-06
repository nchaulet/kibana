/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import chrome from 'ui/chrome';
import React, { useEffect, useState } from 'react';

import {
  CENTER_ALIGNMENT,
  EuiBasicTable,
  EuiButton,
  EuiEmptyPrompt,
  EuiLink,
  EuiText,
} from '@elastic/eui';

import styled from 'styled-components';
import * as i18n from '../translations';
import { JobSwitch } from './job_switch';
import { Job } from '../types';

const JobNameWrapper = styled.div`
  margin: 5px 0;
`;

// TODO: Use SASS mixin @include EuiTextTruncate when we switch from styled components
const truncateThreshold = 200;

const getJobsTableColumns = (
  isLoading: boolean,
  onJobStateChange: (jobName: string, latestTimestampMs: number, enable: boolean) => void
) => [
  {
    name: i18n.COLUMN_JOB_NAME,
    render: ({ id, description }: Job) => (
      <JobNameWrapper>
        <EuiLink href={`${chrome.getBasePath()}/app/ml`} target="_blank">
          <EuiText size="s">{id}</EuiText>
        </EuiLink>
        <EuiText color="subdued" size="xs">
          {description.length > truncateThreshold
            ? `${description.substring(0, truncateThreshold)}...`
            : description}
        </EuiText>
      </JobNameWrapper>
    ),
  },

  {
    name: i18n.COLUMN_RUN_JOB,
    render: (job: Job) => (
      <JobSwitch job={job} isSummaryLoading={isLoading} onJobStateChange={onJobStateChange} />
    ),
    align: CENTER_ALIGNMENT,
    width: '80px',
  },
];

const getPaginatedItems = (items: Job[], pageIndex: number, pageSize: number): Job[] =>
  items.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize);

export interface JobTableProps {
  isLoading: boolean;
  jobs: Job[];
  onJobStateChange: (jobName: string, latestTimestampMs: number, enable: boolean) => void;
}

export const JobsTable = React.memo(({ isLoading, jobs, onJobStateChange }: JobTableProps) => {
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 5;

  const pagination = {
    hidePerPageOptions: true,
    pageIndex,
    pageSize,
    totalItemCount: jobs.length,
  };

  useEffect(() => {
    setPageIndex(0);
  }, [jobs.length]);

  return (
    <EuiBasicTable
      data-test-subj="jobs-table"
      compressed={true}
      columns={getJobsTableColumns(isLoading, onJobStateChange)}
      items={getPaginatedItems(jobs, pageIndex, pageSize)}
      loading={isLoading}
      noItemsMessage={<NoItemsMessage />}
      pagination={pagination}
      responsive={false}
      onChange={({ page }: { page: { index: number } }) => {
        setPageIndex(page.index);
      }}
    />
  );
});

export const NoItemsMessage = React.memo(() => (
  <EuiEmptyPrompt
    title={<h3>{i18n.NO_ITEMS_TEXT}</h3>}
    titleSize="xs"
    actions={
      <EuiButton
        href="ml#/jobs/new_job/step/index_or_search"
        iconType="popout"
        iconSide="right"
        size="s"
        target="_blank"
      >
        {i18n.CREATE_CUSTOM_JOB}
      </EuiButton>
    }
  />
));
