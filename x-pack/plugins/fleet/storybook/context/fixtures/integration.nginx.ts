/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
import type { GetInfoResponse } from '../../../public/types';
import { KibanaAssetType, ElasticsearchAssetType } from '../../../common/types';

export const response: GetInfoResponse['response'] = {
  name: 'nginx',
  title: 'Nginx',
  version: '0.7.0',
  release: 'experimental',
  description: 'Nginx Integration',
  type: 'integration',
  download: '/epr/nginx/nginx-0.7.0.zip',
  path: '/package/nginx/0.7.0',
  icons: [
    {
      src: '/img/logo_nginx.svg',
      path: '/package/nginx/0.7.0/img/logo_nginx.svg',
      title: 'logo nginx',
      size: '32x32',
      type: 'image/svg+xml',
    },
  ],
  format_version: '1.0.0',
  readme: '/package/nginx/0.7.0/docs/README.md',
  license: 'basic',
  categories: ['web', 'security'],
  conditions: {
    kibana: { version: '^7.14.0' },
  },
  screenshots: [
    {
      src: '/img/nginx-metrics-overview.png',
      path: '/package/nginx/0.7.0/img/nginx-metrics-overview.png',
      title: 'Nginx metrics overview',
      size: '3360x2302',
      type: 'image/png',
    },
    {
      src: '/img/nginx-logs-access-error.png',
      path: '/package/nginx/0.7.0/img/nginx-logs-access-error.png',
      title: 'Nginx access and error logs',
      size: '3360x3590',
      type: 'image/png',
    },
    {
      src: '/img/nginx-logs-overview.png',
      path: '/package/nginx/0.7.0/img/nginx-logs-overview.png',
      title: 'Nginx logs overview',
      size: '3360x3590',
      type: 'image/png',
    },
  ],
  assets: {
    kibana: {
      dashboard: [
        {
          pkgkey: 'nginx-0.7.0',
          service: 'kibana',
          type: KibanaAssetType.dashboard,
          file: 'nginx-023d2930-f1a5-11e7-a9ef-93c69af7b129.json',
          // path: '-0.7.0/kibana/dashboard/nginx-023d2930-f1a5-11e7-a9ef-93c69af7b129.json',
        },
        {
          pkgkey: 'nginx-0.7.0',
          service: 'kibana',
          type: KibanaAssetType.dashboard,
          file: 'nginx-046212a0-a2a1-11e7-928f-5dbe6f6f5519.json',
          // path: 'nginx-0.7.0/kibana/dashboard/nginx-046212a0-a2a1-11e7-928f-5dbe6f6f5519.json',
        },
        {
          pkgkey: 'nginx-0.7.0',
          service: 'kibana',
          type: KibanaAssetType.dashboard,
          file: 'nginx-55a9e6e0-a29e-11e7-928f-5dbe6f6f5519.json',
          // path: 'nginx-0.7.0/kibana/dashboard/nginx-55a9e6e0-a29e-11e7-928f-5dbe6f6f5519.json',
        },
      ],
      ml_module: [
        {
          pkgkey: 'nginx-0.7.0',
          service: 'kibana',
          type: KibanaAssetType.mlModule,
          file: 'nginx-Logs-ml.json',
          // path: 'nginx-0.7.0/kibana/ml_module/nginx-Logs-ml.json',
        },
      ],
      search: [
        {
          pkgkey: 'nginx-0.7.0',
          service: 'kibana',
          type: KibanaAssetType.search,
          file: 'nginx-6d9e66d0-a1f0-11e7-928f-5dbe6f6f5519.json',
          // path: 'nginx-0.7.0/kibana/search/nginx-6d9e66d0-a1f0-11e7-928f-5dbe6f6f5519.json',
        },
        {
          pkgkey: 'nginx-0.7.0',
          service: 'kibana',
          type: KibanaAssetType.search,
          file: 'nginx-9eb25600-a1f0-11e7-928f-5dbe6f6f5519.json',
          // path: 'nginx-0.7.0/kibana/search/nginx-9eb25600-a1f0-11e7-928f-5dbe6f6f5519.json',
        },
        {
          pkgkey: 'nginx-0.7.0',
          service: 'kibana',
          type: KibanaAssetType.search,
          file: 'nginx-Logs-Nginx-integration.json',
          // path: 'nginx-0.7.0/kibana/search/nginx-Logs-Nginx-integration.json',
        },
      ],
      visualization: [
        {
          pkgkey: 'nginx-0.7.0',
          service: 'kibana',
          type: KibanaAssetType.visualization,
          file: 'nginx-0dd6f320-a29f-11e7-928f-5dbe6f6f5519.json',
          // path: 'nginx-0.7.0/kibana/visualization/nginx-0dd6f320-a29f-11e7-928f-5dbe6f6f5519.json',
        },
        {
          pkgkey: 'nginx-0.7.0',
          service: 'kibana',
          type: KibanaAssetType.visualization,
          file: 'nginx-1cfb1a80-a1f4-11e7-928f-5dbe6f6f5519.json',
          // path: 'nginx-0.7.0/kibana/visualization/nginx-1cfb1a80-a1f4-11e7-928f-5dbe6f6f5519.json',
        },
        {
          pkgkey: 'nginx-0.7.0',
          service: 'kibana',
          type: KibanaAssetType.visualization,
          file: 'nginx-46322e50-a1f6-11e7-928f-5dbe6f6f5519.json',
          // path: 'nginx-0.7.0/kibana/visualization/nginx-46322e50-a1f6-11e7-928f-5dbe6f6f5519.json',
        },
        {
          pkgkey: 'nginx-0.7.0',
          service: 'kibana',
          type: KibanaAssetType.visualization,
          file: 'nginx-47a8e0f0-f1a4-11e7-a9ef-93c69af7b129.json',
          // path: 'nginx-0.7.0/kibana/visualization/nginx-47a8e0f0-f1a4-11e7-a9ef-93c69af7b129.json',
        },
        {
          pkgkey: 'nginx-0.7.0',
          service: 'kibana',
          type: KibanaAssetType.visualization,
          file: 'nginx-555df8a0-f1a1-11e7-a9ef-93c69af7b129.json',
          // path: 'nginx-0.7.0/kibana/visualization/nginx-555df8a0-f1a1-11e7-a9ef-93c69af7b129.json',
        },
        {
          pkgkey: 'nginx-0.7.0',
          service: 'kibana',
          type: KibanaAssetType.visualization,
          file: 'nginx-7cc9ea40-3af8-11eb-94b7-0dab91df36a6.json',
          // path: 'nginx-0.7.0/kibana/visualization/nginx-7cc9ea40-3af8-11eb-94b7-0dab91df36a6.json',
        },
        {
          pkgkey: 'nginx-0.7.0',
          service: 'kibana',
          type: KibanaAssetType.visualization,
          file: 'nginx-823b3c80-3af9-11eb-94b7-0dab91df36a6.json',
          // path: 'nginx-0.7.0/kibana/visualization/nginx-823b3c80-3af9-11eb-94b7-0dab91df36a6.json',
        },
        {
          pkgkey: 'nginx-0.7.0',
          service: 'kibana',
          type: KibanaAssetType.visualization,
          file: 'nginx-9184fa00-a1f5-11e7-928f-5dbe6f6f5519.json',
          // path: 'nginx-0.7.0/kibana/visualization/nginx-9184fa00-a1f5-11e7-928f-5dbe6f6f5519.json',
        },
        {
          pkgkey: 'nginx-0.7.0',
          service: 'kibana',
          type: KibanaAssetType.visualization,
          file: 'nginx-9484ecf0-3af5-11eb-94b7-0dab91df36a6.json',
          // path: 'nginx-0.7.0/kibana/visualization/nginx-9484ecf0-3af5-11eb-94b7-0dab91df36a6.json',
        },
        {
          pkgkey: 'nginx-0.7.0',
          service: 'kibana',
          type: KibanaAssetType.visualization,
          file: 'nginx-97109780-a2a5-11e7-928f-5dbe6f6f5519.json',
          // path: 'nginx-0.7.0/kibana/visualization/nginx-97109780-a2a5-11e7-928f-5dbe6f6f5519.json',
        },
        {
          pkgkey: 'nginx-0.7.0',
          service: 'kibana',
          type: KibanaAssetType.visualization,
          file: 'nginx-Access-Browsers.json',
          // path: 'nginx-0.7.0/kibana/visualization/nginx-Access-Browsers.json',
        },
        {
          pkgkey: 'nginx-0.7.0',
          service: 'kibana',
          type: KibanaAssetType.visualization,
          file: 'nginx-Access-Map.json',
          // path: 'nginx-0.7.0/kibana/visualization/nginx-Access-Map.json',
        },
        {
          pkgkey: 'nginx-0.7.0',
          service: 'kibana',
          type: KibanaAssetType.visualization,
          file: 'nginx-Access-OSes.json',
          // path: 'nginx-0.7.0/kibana/visualization/nginx-Access-OSes.json',
        },
        {
          pkgkey: 'nginx-0.7.0',
          service: 'kibana',
          type: KibanaAssetType.visualization,
          file: 'nginx-a1d92240-f1a1-11e7-a9ef-93c69af7b129.json',
          // path: 'nginx-0.7.0/kibana/visualization/nginx-a1d92240-f1a1-11e7-a9ef-93c69af7b129.json',
        },
        {
          pkgkey: 'nginx-0.7.0',
          service: 'kibana',
          type: KibanaAssetType.visualization,
          file: 'nginx-b70b1b20-a1f4-11e7-928f-5dbe6f6f5519.json',
          // path: 'nginx-0.7.0/kibana/visualization/nginx-b70b1b20-a1f4-11e7-928f-5dbe6f6f5519.json',
        },
        {
          pkgkey: 'nginx-0.7.0',
          service: 'kibana',
          type: KibanaAssetType.visualization,
          file: 'nginx-d763a570-f1a1-11e7-a9ef-93c69af7b129.json',
          // path: 'nginx-0.7.0/kibana/visualization/nginx-d763a570-f1a1-11e7-a9ef-93c69af7b129.json',
        },
        {
          pkgkey: 'nginx-0.7.0',
          service: 'kibana',
          type: KibanaAssetType.visualization,
          file: 'nginx-dcbffe30-f1a4-11e7-a9ef-93c69af7b129.json',
          // path: 'nginx-0.7.0/kibana/visualization/nginx-dcbffe30-f1a4-11e7-a9ef-93c69af7b129.json',
        },
        {
          pkgkey: 'nginx-0.7.0',
          service: 'kibana',
          type: KibanaAssetType.visualization,
          file: 'nginx-e302b5a0-3afb-11eb-94b7-0dab91df36a6.json',
          // path: 'nginx-0.7.0/kibana/visualization/nginx-e302b5a0-3afb-11eb-94b7-0dab91df36a6.json',
        },
        {
          pkgkey: 'nginx-0.7.0',
          service: 'kibana',
          type: KibanaAssetType.visualization,
          file: 'nginx-ea7f9e10-3af6-11eb-94b7-0dab91df36a6.json',
          // path: 'nginx-0.7.0/kibana/visualization/nginx-ea7f9e10-3af6-11eb-94b7-0dab91df36a6.json',
        },
      ],
      //  TODO: These were missing from the response, but typed to be required.
      index_pattern: [],
      lens: [],
      map: [],
      security_rule: [],
    },
    elasticsearch: {
      ingest_pipeline: [
        {
          pkgkey: 'nginx-0.7.0',
          service: 'elasticsearch',
          type: ElasticsearchAssetType.ingestPipeline,
          file: 'default.yml',
          dataset: 'access',
          // path: 'nginx-0.7.0/data_stream/access/elasticsearch/ingest_pipeline/default.yml',
        },
        {
          pkgkey: 'nginx-0.7.0',
          service: 'elasticsearch',
          type: ElasticsearchAssetType.ingestPipeline,
          file: 'third-party.yml',
          dataset: 'access',
          // path: 'nginx-0.7.0/data_stream/access/elasticsearch/ingest_pipeline/third-party.yml',
        },
        {
          pkgkey: 'nginx-0.7.0',
          service: 'elasticsearch',
          type: ElasticsearchAssetType.ingestPipeline,
          file: 'default.yml',
          dataset: 'error',
          // path: 'nginx-0.7.0/data_stream/error/elasticsearch/ingest_pipeline/default.yml',
        },
        {
          pkgkey: 'nginx-0.7.0',
          service: 'elasticsearch',
          type: ElasticsearchAssetType.ingestPipeline,
          file: 'third-party.yml',
          dataset: 'error',
          // path: 'nginx-0.7.0/data_stream/error/elasticsearch/ingest_pipeline/third-party.yml',
        },
      ],
      // TODO: These were missing from the response, but typed to be required.
      component_template: [],
      data_stream_ilm_policy: [],
      ilm_policy: [],
      index_template: [],
      transform: [],
      ml_model: [],
    },
  },
  policy_templates: [
    {
      name: 'nginx',
      title: 'Nginx logs and metrics',
      description: 'Collect logs and metrics from Nginx instances',
      inputs: [
        {
          type: 'logfile',
          title: 'Collect logs from Nginx instances',
          description: 'Collecting Nginx access and error logs',
        },
        {
          type: 'httpjson',
          vars: [
            {
              name: 'url',
              type: 'text',
              title: 'URL of Splunk Enterprise Server',
              description: 'i.e. scheme://host:port, path is automatic',
              multi: false,
              required: true,
              show_user: true,
              default: 'https://server.example.com:8089',
            },
            {
              name: 'username',
              type: 'text',
              title: 'Splunk REST API Username',
              multi: false,
              required: false,
              show_user: true,
            },
            {
              name: 'password',
              type: 'password',
              title: 'Splunk REST API Password',
              multi: false,
              required: false,
              show_user: true,
            },
            {
              name: 'token',
              type: 'password',
              title: 'Splunk Authorization Token',
              description:
                'Bearer Token or Session Key, e.g. "Bearer eyJFd3e46..."\nor "Splunk 192fd3e...".  Cannot be used with username\nand password.\n',
              multi: false,
              required: false,
              show_user: true,
            },
            {
              name: 'ssl',
              type: 'yaml',
              title: 'SSL Configuration',
              description:
                'i.e. certificate_authorities, supported_protocols, verification_mode etc.',
              multi: false,
              required: false,
              show_user: false,
              default:
                '#certificate_authorities:\n#  - |\n#    -----BEGIN CERTIFICATE-----\n#    MIIDCjCCAfKgAwIBAgITJ706Mu2wJlKckpIvkWxEHvEyijANBgkqhkiG9w0BAQsF\n#    ADAUMRIwEAYDVQQDDAlsb2NhbGhvc3QwIBcNMTkwNzIyMTkyOTA0WhgPMjExOTA2\n#    MjgxOTI5MDRaMBQxEjAQBgNVBAMMCWxvY2FsaG9zdDCCASIwDQYJKoZIhvcNAQEB\n#    BQADggEPADCCAQoCggEBANce58Y/JykI58iyOXpxGfw0/gMvF0hUQAcUrSMxEO6n\n#    fZRA49b4OV4SwWmA3395uL2eB2NB8y8qdQ9muXUdPBWE4l9rMZ6gmfu90N5B5uEl\n#    94NcfBfYOKi1fJQ9i7WKhTjlRkMCgBkWPkUokvBZFRt8RtF7zI77BSEorHGQCk9t\n#    /D7BS0GJyfVEhftbWcFEAG3VRcoMhF7kUzYwp+qESoriFRYLeDWv68ZOvG7eoWnP\n#    PsvZStEVEimjvK5NSESEQa9xWyJOmlOKXhkdymtcUd/nXnx6UTCFgnkgzSdTWV41\n#    CI6B6aJ9svCTI2QuoIq2HxX/ix7OvW1huVmcyHVxyUECAwEAAaNTMFEwHQYDVR0O\n#    BBYEFPwN1OceFGm9v6ux8G+DZ3TUDYxqMB8GA1UdIwQYMBaAFPwN1OceFGm9v6ux\n#    8G+DZ3TUDYxqMA8GA1UdEwEB/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAG5D\n#    874A4YI7YUwOVsVAdbWtgp1d0zKcPRR+r2OdSbTAV5/gcS3jgBJ3i1BN34JuDVFw\n#    3DeJSYT3nxy2Y56lLnxDeF8CUTUtVQx3CuGkRg1ouGAHpO/6OqOhwLLorEmxi7tA\n#    H2O8mtT0poX5AnOAhzVy7QW0D/k4WaoLyckM5hUa6RtvgvLxOwA0U+VGurCDoctu\n#    8F4QOgTAWyh8EZIwaKCliFRSynDpv3JTUwtfZkxo6K6nce1RhCWFAsMvDZL8Dgc0\n#    yvgJ38BRsFOtkRuAGSf6ZUwTO8JJRRIFnpUzXflAnGivK9M13D5GEQMmIl6U9Pvk\n#    sxSmbIUfc2SGJGCJD4I=\n#    -----END CERTIFICATE-----\n',
            },
          ],
          title: 'Collect logs from third-party REST API (experimental)',
          description: 'Collect logs from third-party REST API (experimental)',
        },
        {
          type: 'nginx/metrics',
          vars: [
            {
              name: 'hosts',
              type: 'text',
              title: 'Hosts',
              multi: true,
              required: true,
              show_user: true,
              default: ['http://127.0.0.1:80'],
            },
          ],
          title: 'Collect metrics from Nginx instances',
          description: 'Collecting Nginx stub status metrics',
        },
      ],
      multiple: true,
    },
  ],
  data_streams: [
    {
      type: 'logs',
      dataset: 'nginx.access',
      title: 'Nginx access logs',
      release: 'experimental',
      ingest_pipeline: 'default',
      streams: [
        {
          input: 'logfile',
          vars: [
            {
              name: 'paths',
              type: 'text',
              title: 'Paths',
              multi: true,
              required: true,
              show_user: true,
              default: ['/var/log/nginx/access.log*'],
            },
            {
              name: 'tags',
              type: 'text',
              title: 'Tags',
              multi: true,
              required: true,
              show_user: false,
              default: ['nginx-access'],
            },
            {
              name: 'preserve_original_event',
              type: 'bool',
              title: 'Preserve original event',
              description:
                'Preserves a raw copy of the original event, added to the field `event.original`',
              multi: false,
              required: true,
              show_user: true,
              default: false,
            },
            {
              name: 'processors',
              type: 'yaml',
              title: 'Processors',
              description:
                'Processors are used to reduce the number of fields in the exported event or to enhance the event with metadata. This executes in the agent before the logs are parsed. See [Processors](https://www.elastic.co/guide/en/beats/filebeat/current/filtering-and-enhancing-data.html) for details.\n',
              multi: false,
              required: false,
              show_user: false,
            },
          ],
          template_path: 'stream.yml.hbs',
          title: 'Nginx access logs',
          description: 'Collect Nginx access logs',
          enabled: true,
        },
        {
          input: 'httpjson',
          vars: [
            {
              name: 'interval',
              type: 'text',
              title: 'Interval to query Splunk Enterprise REST API',
              description: 'Go Duration syntax (eg. 10s)',
              multi: false,
              required: true,
              show_user: true,
              default: '10s',
            },
            {
              name: 'search',
              type: 'text',
              title: 'Splunk search string',
              multi: false,
              required: true,
              show_user: true,
              default: 'search sourcetype=nginx:plus:access',
            },
            {
              name: 'tags',
              type: 'text',
              title: 'Tags',
              multi: true,
              required: false,
              show_user: false,
              default: ['forwarded', 'nginx-access'],
            },
            {
              name: 'preserve_original_event',
              type: 'bool',
              title: 'Preserve original event',
              description:
                'Preserves a raw copy of the original event, added to the field `event.original`',
              multi: false,
              required: true,
              show_user: true,
              default: false,
            },
            {
              name: 'processors',
              type: 'yaml',
              title: 'Processors',
              description:
                'Processors are used to reduce the number of fields in the exported event or to enhance the event with metadata. This executes in the agent before the logs are parsed. See [Processors](https://www.elastic.co/guide/en/beats/filebeat/current/filtering-and-enhancing-data.html) for details.',
              multi: false,
              required: false,
              show_user: false,
            },
          ],
          template_path: 'httpjson.yml.hbs',
          title: 'Nginx access logs via Splunk Enterprise REST API',
          description: 'Collect Nginx access logs via Splunk Enterprise REST API',
          enabled: false,
        },
      ],
      package: 'nginx',
      path: 'access',
    },
    {
      type: 'logs',
      dataset: 'nginx.error',
      title: 'Nginx error logs',
      release: 'experimental',
      ingest_pipeline: 'default',
      streams: [
        {
          input: 'logfile',
          vars: [
            {
              name: 'paths',
              type: 'text',
              title: 'Paths',
              multi: true,
              required: true,
              show_user: true,
              default: ['/var/log/nginx/error.log*'],
            },
            {
              name: 'tags',
              type: 'text',
              title: 'Tags',
              multi: true,
              required: true,
              show_user: false,
              default: ['nginx-error'],
            },
            {
              name: 'preserve_original_event',
              type: 'bool',
              title: 'Preserve original event',
              description:
                'Preserves a raw copy of the original event, added to the field `event.original`',
              multi: false,
              required: true,
              show_user: true,
              default: false,
            },
            {
              name: 'processors',
              type: 'yaml',
              title: 'Processors',
              description:
                'Processors are used to reduce the number of fields in the exported event or to enhance the event with metadata. This executes in the agent before the logs are parsed. See [Processors](https://www.elastic.co/guide/en/beats/filebeat/current/filtering-and-enhancing-data.html) for details.\n',
              multi: false,
              required: false,
              show_user: false,
            },
          ],
          template_path: 'stream.yml.hbs',
          title: 'Nginx error logs',
          description: 'Collect Nginx error logs',
          enabled: true,
        },
        {
          input: 'httpjson',
          vars: [
            {
              name: 'interval',
              type: 'text',
              title: 'Interval to query REST API',
              description: 'Go Duration syntax (eg. 10s)',
              multi: false,
              required: true,
              show_user: true,
              default: '10s',
            },
            {
              name: 'search',
              type: 'text',
              title: 'Search String',
              multi: false,
              required: true,
              show_user: true,
              default: 'search sourcetype=nginx:plus:error',
            },
            {
              name: 'tags',
              type: 'text',
              title: 'Tags',
              multi: true,
              required: false,
              show_user: false,
              default: ['forwarded', 'nginx-error'],
            },
            {
              name: 'preserve_original_event',
              type: 'bool',
              title: 'Preserve original event',
              description:
                'Preserves a raw copy of the original event, added to the field `event.original`',
              multi: false,
              required: true,
              show_user: true,
              default: false,
            },
            {
              name: 'processors',
              type: 'yaml',
              title: 'Processors',
              description:
                'Processors are used to reduce the number of fields in the exported event or to enhance the event with metadata. This executes in the agent before the logs are parsed. See [Processors](https://www.elastic.co/guide/en/beats/filebeat/current/filtering-and-enhancing-data.html) for details.',
              multi: false,
              required: false,
              show_user: false,
            },
          ],
          template_path: 'httpjson.yml.hbs',
          title: 'Nginx error logs via Splunk REST API',
          description: 'Collect Nginx error logs via Splunk REST API',
          enabled: false,
        },
      ],
      package: 'nginx',
      path: 'error',
    },
    {
      type: 'metrics',
      dataset: 'nginx.stubstatus',
      title: 'Nginx stubstatus metrics',
      release: 'experimental',
      streams: [
        {
          input: 'nginx/metrics',
          vars: [
            {
              name: 'period',
              type: 'text',
              title: 'Period',
              multi: false,
              required: true,
              show_user: true,
              default: '10s',
            },
            {
              name: 'server_status_path',
              type: 'text',
              title: 'Server Status Path',
              multi: false,
              required: true,
              show_user: false,
              default: '/nginx_status',
            },
          ],
          template_path: 'stream.yml.hbs',
          title: 'Nginx stub status metrics',
          description: 'Collect Nginx stub status metrics',
          enabled: true,
        },
      ],
      package: 'nginx',
      path: 'stubstatus',
    },
  ],
  owner: {
    github: 'elastic/integrations',
  },
  latestVersion: '0.7.0',
  removable: true,
  status: 'not_installed',
};
