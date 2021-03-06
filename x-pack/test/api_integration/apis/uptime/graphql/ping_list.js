/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import expect from '@kbn/expect';
import { pingsQueryString } from '../../../../../legacy/plugins/uptime/public/queries';
import { expectFixtureEql } from './expect_fixture_eql';

export default function ({ getService }) {
  describe('pingList query', () => {
    const supertest = getService('supertest');

    it('returns a list of pings for the given date range and default size', async () => {
      const getPingsQuery = {
        operationName: 'PingList',
        query: pingsQueryString,
        variables: {
          dateRangeStart: '2019-01-28T17:40:08.078Z',
          dateRangeEnd: '2019-01-28T19:00:16.078Z',
        },
      };
      const {
        body: { data },
      } = await supertest
        .post('/api/uptime/graphql')
        .set('kbn-xsrf', 'foo')
        .send({ ...getPingsQuery });
      const {
        allPings: { pings },
      } = data;
      expect(pings).length(10);
      expectFixtureEql(data, 'ping_list');
    });

    it('returns a list of pings for the date range and given size', async () => {
      const SIZE = 50;
      const getPingsQuery = {
        operationName: 'PingList',
        query: pingsQueryString,
        variables: {
          dateRangeStart: '2019-01-28T17:40:08.078Z',
          dateRangeEnd: '2019-01-28T19:00:16.078Z',
          size: SIZE,
        },
      };
      const {
        body: { data },
      } = await supertest
        .post('/api/uptime/graphql')
        .set('kbn-xsrf', 'foo')
        .send({ ...getPingsQuery });
      const {
        allPings: { pings },
      } = data;
      expect(pings).length(SIZE);
      expectFixtureEql(data, 'ping_list_count');
    });

    it('returns a list of pings for a monitor ID', async () => {
      const SIZE = 15;
      const MONITOR_ID = 'auto-tcp-0X81440A68E839814C';
      const getPingsQuery = {
        operationName: 'PingList',
        query: pingsQueryString,
        variables: {
          dateRangeStart: '2019-01-28T17:40:08.078Z',
          dateRangeEnd: '2019-01-28T19:00:16.078Z',
          monitorId: MONITOR_ID,
          size: SIZE,
        },
      };
      const {
        body: { data },
      } = await supertest
        .post('/api/uptime/graphql')
        .set('kbn-xsrf', 'foo')
        .send({ ...getPingsQuery });
      expectFixtureEql(data, 'ping_list_monitor_id');
    });

    it('returns a list of pings sorted ascending', async () => {
      const SIZE = 5;
      const MONITOR_ID = 'auto-tcp-0X81440A68E839814C';
      const getPingsQuery = {
        operationName: 'PingList',
        query: pingsQueryString,
        variables: {
          dateRangeStart: '2019-01-28T17:40:08.078Z',
          dateRangeEnd: '2019-01-28T19:00:16.078Z',
          monitorId: MONITOR_ID,
          size: SIZE,
          sort: 'asc',
        },
      };
      const {
        body: { data },
      } = await supertest
        .post('/api/uptime/graphql')
        .set('kbn-xsrf', 'foo')
        .send({ ...getPingsQuery });
      expectFixtureEql(data, 'ping_list_sort');
    });
  });
}
