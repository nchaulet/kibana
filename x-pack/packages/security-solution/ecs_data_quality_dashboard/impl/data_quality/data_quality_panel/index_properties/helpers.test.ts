/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EcsFlat } from '@kbn/ecs';

import {
  getMappingsProperties,
  getSortedPartitionedFieldMetadata,
  hasAllDataFetchingCompleted,
} from './helpers';
import { mockIndicesGetMappingIndexMappingRecords } from '../../mock/indices_get_mapping_index_mapping_record/mock_indices_get_mapping_index_mapping_record';
import { mockMappingsProperties } from '../../mock/mappings_properties/mock_mappings_properties';
import { EcsMetadata } from '../../types';

const ecsMetadata: Record<string, EcsMetadata> = EcsFlat as unknown as Record<string, EcsMetadata>;

describe('helpers', () => {
  describe('getSortedPartitionedFieldMetadata', () => {
    test('it returns null when mappings are loading', () => {
      expect(
        getSortedPartitionedFieldMetadata({
          ecsMetadata,
          loadingMappings: true, // <--
          mappingsProperties: mockMappingsProperties,
          unallowedValues: {},
        })
      ).toBeNull();
    });

    test('it returns null when `ecsMetadata` is null', () => {
      expect(
        getSortedPartitionedFieldMetadata({
          ecsMetadata: null, // <--
          loadingMappings: false,
          mappingsProperties: mockMappingsProperties,
          unallowedValues: {},
        })
      ).toBeNull();
    });

    test('it returns null when `unallowedValues` is null', () => {
      expect(
        getSortedPartitionedFieldMetadata({
          ecsMetadata,
          loadingMappings: false,
          mappingsProperties: mockMappingsProperties,
          unallowedValues: null, // <--
        })
      ).toBeNull();
    });

    describe('when `mappingsProperties` is unknown', () => {
      const expected = {
        all: [],
        custom: [],
        ecsCompliant: [],
        incompatible: [
          {
            description:
              'Date/time when the event originated. This is the date/time extracted from the event, typically representing when the event was generated by the source. If the event source has no original timestamp, this value is typically populated by the first time the event was received by the pipeline. Required field for all events.',
            hasEcsMetadata: true,
            indexFieldName: '@timestamp',
            indexFieldType: '-',
            indexInvalidValues: [],
            isEcsCompliant: false,
            isInSameFamily: false,
            type: 'date',
          },
        ],
      };

      test('it returns a `PartitionedFieldMetadata` with an `incompatible` `@timestamp` when  `mappingsProperties` is undefined', () => {
        expect(
          getSortedPartitionedFieldMetadata({
            ecsMetadata,
            loadingMappings: false,
            mappingsProperties: undefined, // <--
            unallowedValues: {},
          })
        ).toEqual(expected);
      });

      test('it returns a `PartitionedFieldMetadata` with an `incompatible` `@timestamp` when  `mappingsProperties` is null', () => {
        expect(
          getSortedPartitionedFieldMetadata({
            ecsMetadata,
            loadingMappings: false,
            mappingsProperties: null, // <--
            unallowedValues: {},
          })
        ).toEqual(expected);
      });
    });

    test('it returns the expected sorted field metadata', () => {
      const unallowedValues = {
        'event.category': [
          {
            count: 2,
            fieldName: 'an_invalid_category',
          },
          {
            count: 1,
            fieldName: 'theory',
          },
        ],
        'event.kind': [],
        'event.outcome': [],
        'event.type': [],
      };

      expect(
        getSortedPartitionedFieldMetadata({
          ecsMetadata,
          loadingMappings: false,
          mappingsProperties: mockMappingsProperties,
          unallowedValues,
        })
      ).toEqual({
        all: [
          {
            dashed_name: 'timestamp',
            description:
              'Date/time when the event originated.\nThis is the date/time extracted from the event, typically representing when the event was generated by the source.\nIf the event source has no original timestamp, this value is typically populated by the first time the event was received by the pipeline.\nRequired field for all events.',
            example: '2016-05-23T08:05:34.853Z',
            flat_name: '@timestamp',
            level: 'core',
            name: '@timestamp',
            normalize: [],
            required: true,
            short: 'Date/time when the event originated.',
            type: 'date',
            indexFieldName: '@timestamp',
            indexFieldType: 'date',
            indexInvalidValues: [],
            hasEcsMetadata: true,
            isEcsCompliant: true,
            isInSameFamily: false,
          },
          {
            allowed_values: [
              {
                description:
                  'Events in this category are related to the challenge and response process in which credentials are supplied and verified to allow the creation of a session. Common sources for these logs are Windows event logs and ssh logs. Visualize and analyze events in this category to look for failed logins, and other authentication-related activity.',
                expected_event_types: ['start', 'end', 'info'],
                name: 'authentication',
              },
              {
                description:
                  'Events in the configuration category have to deal with creating, modifying, or deleting the settings or parameters of an application, process, or system.\nExample sources include security policy change logs, configuration auditing logging, and system integrity monitoring.',
                expected_event_types: ['access', 'change', 'creation', 'deletion', 'info'],
                name: 'configuration',
              },
              {
                description:
                  'The database category denotes events and metrics relating to a data storage and retrieval system. Note that use of this category is not limited to relational database systems. Examples include event logs from MS SQL, MySQL, Elasticsearch, MongoDB, etc. Use this category to visualize and analyze database activity such as accesses and changes.',
                expected_event_types: ['access', 'change', 'info', 'error'],
                name: 'database',
              },
              {
                description:
                  'Events in the driver category have to do with operating system device drivers and similar software entities such as Windows drivers, kernel extensions, kernel modules, etc.\nUse events and metrics in this category to visualize and analyze driver-related activity and status on hosts.',
                expected_event_types: ['change', 'end', 'info', 'start'],
                name: 'driver',
              },
              {
                description:
                  'This category is used for events relating to email messages, email attachments, and email network or protocol activity.\nEmails events can be produced by email security gateways, mail transfer agents, email cloud service providers, or mail server monitoring applications.',
                expected_event_types: ['info'],
                name: 'email',
              },
              {
                description:
                  'Relating to a set of information that has been created on, or has existed on a filesystem. Use this category of events to visualize and analyze the creation, access, and deletions of files. Events in this category can come from both host-based and network-based sources. An example source of a network-based detection of a file transfer would be the Zeek file.log.',
                expected_event_types: ['change', 'creation', 'deletion', 'info'],
                name: 'file',
              },
              {
                description:
                  'Use this category to visualize and analyze information such as host inventory or host lifecycle events.\nMost of the events in this category can usually be observed from the outside, such as from a hypervisor or a control plane\'s point of view. Some can also be seen from within, such as "start" or "end".\nNote that this category is for information about hosts themselves; it is not meant to capture activity "happening on a host".',
                expected_event_types: ['access', 'change', 'end', 'info', 'start'],
                name: 'host',
              },
              {
                description:
                  'Identity and access management (IAM) events relating to users, groups, and administration. Use this category to visualize and analyze IAM-related logs and data from active directory, LDAP, Okta, Duo, and other IAM systems.',
                expected_event_types: [
                  'admin',
                  'change',
                  'creation',
                  'deletion',
                  'group',
                  'info',
                  'user',
                ],
                name: 'iam',
              },
              {
                description:
                  'Relating to intrusion detections from IDS/IPS systems and functions, both network and host-based. Use this category to visualize and analyze intrusion detection alerts from systems such as Snort, Suricata, and Palo Alto threat detections.',
                expected_event_types: ['allowed', 'denied', 'info'],
                name: 'intrusion_detection',
              },
              {
                description:
                  'Malware detection events and alerts. Use this category to visualize and analyze malware detections from EDR/EPP systems such as Elastic Endpoint Security, Symantec Endpoint Protection, Crowdstrike, and network IDS/IPS systems such as Suricata, or other sources of malware-related events such as Palo Alto Networks threat logs and Wildfire logs.',
                expected_event_types: ['info'],
                name: 'malware',
              },
              {
                description:
                  'Relating to all network activity, including network connection lifecycle, network traffic, and essentially any event that includes an IP address. Many events containing decoded network protocol transactions fit into this category. Use events in this category to visualize or analyze counts of network ports, protocols, addresses, geolocation information, etc.',
                expected_event_types: [
                  'access',
                  'allowed',
                  'connection',
                  'denied',
                  'end',
                  'info',
                  'protocol',
                  'start',
                ],
                name: 'network',
              },
              {
                description:
                  'Relating to software packages installed on hosts. Use this category to visualize and analyze inventory of software installed on various hosts, or to determine host vulnerability in the absence of vulnerability scan data.',
                expected_event_types: [
                  'access',
                  'change',
                  'deletion',
                  'info',
                  'installation',
                  'start',
                ],
                name: 'package',
              },
              {
                description:
                  'Use this category of events to visualize and analyze process-specific information such as lifecycle events or process ancestry.',
                expected_event_types: ['access', 'change', 'end', 'info', 'start'],
                name: 'process',
              },
              {
                description:
                  'Having to do with settings and assets stored in the Windows registry. Use this category to visualize and analyze activity such as registry access and modifications.',
                expected_event_types: ['access', 'change', 'creation', 'deletion'],
                name: 'registry',
              },
              {
                description:
                  'The session category is applied to events and metrics regarding logical persistent connections to hosts and services. Use this category to visualize and analyze interactive or automated persistent connections between assets. Data for this category may come from Windows Event logs, SSH logs, or stateless sessions such as HTTP cookie-based sessions, etc.',
                expected_event_types: ['start', 'end', 'info'],
                name: 'session',
              },
              {
                description:
                  "Use this category to visualize and analyze events describing threat actors' targets, motives, or behaviors.",
                expected_event_types: ['indicator'],
                name: 'threat',
              },
              {
                description:
                  'Relating to vulnerability scan results. Use this category to analyze vulnerabilities detected by Tenable, Qualys, internal scanners, and other vulnerability management sources.',
                expected_event_types: ['info'],
                name: 'vulnerability',
              },
              {
                description:
                  'Relating to web server access. Use this category to create a dashboard of web server/proxy activity from apache, IIS, nginx web servers, etc. Note: events from network observers such as Zeek http log may also be included in this category.',
                expected_event_types: ['access', 'error', 'info'],
                name: 'web',
              },
            ],
            dashed_name: 'event-category',
            description:
              'This is one of four ECS Categorization Fields, and indicates the second level in the ECS category hierarchy.\n`event.category` represents the "big buckets" of ECS categories. For example, filtering on `event.category:process` yields all events relating to process activity. This field is closely related to `event.type`, which is used as a subcategory.\nThis field is an array. This will allow proper categorization of some events that fall in multiple categories.',
            example: 'authentication',
            flat_name: 'event.category',
            ignore_above: 1024,
            level: 'core',
            name: 'category',
            normalize: ['array'],
            short: 'Event category. The second categorization field in the hierarchy.',
            type: 'keyword',
            indexFieldName: 'event.category',
            indexFieldType: 'keyword',
            indexInvalidValues: [
              {
                count: 2,
                fieldName: 'an_invalid_category',
              },
              {
                count: 1,
                fieldName: 'theory',
              },
            ],
            hasEcsMetadata: true,
            isEcsCompliant: false,
            isInSameFamily: true,
          },
          {
            dashed_name: 'host-name',
            description:
              'Name of the host.\nIt can contain what `hostname` returns on Unix systems, the fully qualified domain name, or a name specified by the user. The sender decides which value to use.',
            flat_name: 'host.name',
            ignore_above: 1024,
            level: 'core',
            name: 'name',
            normalize: [],
            short: 'Name of the host.',
            type: 'keyword',
            indexFieldName: 'host.name',
            indexFieldType: 'text',
            indexInvalidValues: [],
            hasEcsMetadata: true,
            isEcsCompliant: false,
            isInSameFamily: false,
          },
          {
            indexFieldName: 'host.name.keyword',
            indexFieldType: 'keyword',
            indexInvalidValues: [],
            hasEcsMetadata: false,
            isEcsCompliant: false,
            isInSameFamily: false,
          },
          {
            indexFieldName: 'some.field',
            indexFieldType: 'text',
            indexInvalidValues: [],
            hasEcsMetadata: false,
            isEcsCompliant: false,
            isInSameFamily: false,
          },
          {
            indexFieldName: 'some.field.keyword',
            indexFieldType: 'keyword',
            indexInvalidValues: [],
            hasEcsMetadata: false,
            isEcsCompliant: false,
            isInSameFamily: false,
          },
          {
            dashed_name: 'source-ip',
            description: 'IP address of the source (IPv4 or IPv6).',
            flat_name: 'source.ip',
            level: 'core',
            name: 'ip',
            normalize: [],
            short: 'IP address of the source.',
            type: 'ip',
            indexFieldName: 'source.ip',
            indexFieldType: 'text',
            indexInvalidValues: [],
            hasEcsMetadata: true,
            isEcsCompliant: false,
            isInSameFamily: false,
          },
          {
            indexFieldName: 'source.ip.keyword',
            indexFieldType: 'keyword',
            indexInvalidValues: [],
            hasEcsMetadata: false,
            isEcsCompliant: false,
            isInSameFamily: false,
          },
          {
            dashed_name: 'source-port',
            description: 'Port of the source.',
            flat_name: 'source.port',
            format: 'string',
            level: 'core',
            name: 'port',
            normalize: [],
            short: 'Port of the source.',
            type: 'long',
            indexFieldName: 'source.port',
            indexFieldType: 'long',
            indexInvalidValues: [],
            hasEcsMetadata: true,
            isEcsCompliant: true,
            isInSameFamily: false,
          },
        ],
        ecsCompliant: [
          {
            dashed_name: 'timestamp',
            description:
              'Date/time when the event originated.\nThis is the date/time extracted from the event, typically representing when the event was generated by the source.\nIf the event source has no original timestamp, this value is typically populated by the first time the event was received by the pipeline.\nRequired field for all events.',
            example: '2016-05-23T08:05:34.853Z',
            flat_name: '@timestamp',
            level: 'core',
            name: '@timestamp',
            normalize: [],
            required: true,
            short: 'Date/time when the event originated.',
            type: 'date',
            indexFieldName: '@timestamp',
            indexFieldType: 'date',
            indexInvalidValues: [],
            hasEcsMetadata: true,
            isEcsCompliant: true,
            isInSameFamily: false,
          },
          {
            dashed_name: 'source-port',
            description: 'Port of the source.',
            flat_name: 'source.port',
            format: 'string',
            level: 'core',
            name: 'port',
            normalize: [],
            short: 'Port of the source.',
            type: 'long',
            indexFieldName: 'source.port',
            indexFieldType: 'long',
            indexInvalidValues: [],
            hasEcsMetadata: true,
            isEcsCompliant: true,
            isInSameFamily: false,
          },
        ],
        custom: [
          {
            indexFieldName: 'host.name.keyword',
            indexFieldType: 'keyword',
            indexInvalidValues: [],
            hasEcsMetadata: false,
            isEcsCompliant: false,
            isInSameFamily: false,
          },
          {
            indexFieldName: 'some.field',
            indexFieldType: 'text',
            indexInvalidValues: [],
            hasEcsMetadata: false,
            isEcsCompliant: false,
            isInSameFamily: false,
          },
          {
            indexFieldName: 'some.field.keyword',
            indexFieldType: 'keyword',
            indexInvalidValues: [],
            hasEcsMetadata: false,
            isEcsCompliant: false,
            isInSameFamily: false,
          },
          {
            indexFieldName: 'source.ip.keyword',
            indexFieldType: 'keyword',
            indexInvalidValues: [],
            hasEcsMetadata: false,
            isEcsCompliant: false,
            isInSameFamily: false,
          },
        ],
        incompatible: [
          {
            allowed_values: [
              {
                description:
                  'Events in this category are related to the challenge and response process in which credentials are supplied and verified to allow the creation of a session. Common sources for these logs are Windows event logs and ssh logs. Visualize and analyze events in this category to look for failed logins, and other authentication-related activity.',
                expected_event_types: ['start', 'end', 'info'],
                name: 'authentication',
              },
              {
                description:
                  'Events in the configuration category have to deal with creating, modifying, or deleting the settings or parameters of an application, process, or system.\nExample sources include security policy change logs, configuration auditing logging, and system integrity monitoring.',
                expected_event_types: ['access', 'change', 'creation', 'deletion', 'info'],
                name: 'configuration',
              },
              {
                description:
                  'The database category denotes events and metrics relating to a data storage and retrieval system. Note that use of this category is not limited to relational database systems. Examples include event logs from MS SQL, MySQL, Elasticsearch, MongoDB, etc. Use this category to visualize and analyze database activity such as accesses and changes.',
                expected_event_types: ['access', 'change', 'info', 'error'],
                name: 'database',
              },
              {
                description:
                  'Events in the driver category have to do with operating system device drivers and similar software entities such as Windows drivers, kernel extensions, kernel modules, etc.\nUse events and metrics in this category to visualize and analyze driver-related activity and status on hosts.',
                expected_event_types: ['change', 'end', 'info', 'start'],
                name: 'driver',
              },
              {
                description:
                  'This category is used for events relating to email messages, email attachments, and email network or protocol activity.\nEmails events can be produced by email security gateways, mail transfer agents, email cloud service providers, or mail server monitoring applications.',
                expected_event_types: ['info'],
                name: 'email',
              },
              {
                description:
                  'Relating to a set of information that has been created on, or has existed on a filesystem. Use this category of events to visualize and analyze the creation, access, and deletions of files. Events in this category can come from both host-based and network-based sources. An example source of a network-based detection of a file transfer would be the Zeek file.log.',
                expected_event_types: ['change', 'creation', 'deletion', 'info'],
                name: 'file',
              },
              {
                description:
                  'Use this category to visualize and analyze information such as host inventory or host lifecycle events.\nMost of the events in this category can usually be observed from the outside, such as from a hypervisor or a control plane\'s point of view. Some can also be seen from within, such as "start" or "end".\nNote that this category is for information about hosts themselves; it is not meant to capture activity "happening on a host".',
                expected_event_types: ['access', 'change', 'end', 'info', 'start'],
                name: 'host',
              },
              {
                description:
                  'Identity and access management (IAM) events relating to users, groups, and administration. Use this category to visualize and analyze IAM-related logs and data from active directory, LDAP, Okta, Duo, and other IAM systems.',
                expected_event_types: [
                  'admin',
                  'change',
                  'creation',
                  'deletion',
                  'group',
                  'info',
                  'user',
                ],
                name: 'iam',
              },
              {
                description:
                  'Relating to intrusion detections from IDS/IPS systems and functions, both network and host-based. Use this category to visualize and analyze intrusion detection alerts from systems such as Snort, Suricata, and Palo Alto threat detections.',
                expected_event_types: ['allowed', 'denied', 'info'],
                name: 'intrusion_detection',
              },
              {
                description:
                  'Malware detection events and alerts. Use this category to visualize and analyze malware detections from EDR/EPP systems such as Elastic Endpoint Security, Symantec Endpoint Protection, Crowdstrike, and network IDS/IPS systems such as Suricata, or other sources of malware-related events such as Palo Alto Networks threat logs and Wildfire logs.',
                expected_event_types: ['info'],
                name: 'malware',
              },
              {
                description:
                  'Relating to all network activity, including network connection lifecycle, network traffic, and essentially any event that includes an IP address. Many events containing decoded network protocol transactions fit into this category. Use events in this category to visualize or analyze counts of network ports, protocols, addresses, geolocation information, etc.',
                expected_event_types: [
                  'access',
                  'allowed',
                  'connection',
                  'denied',
                  'end',
                  'info',
                  'protocol',
                  'start',
                ],
                name: 'network',
              },
              {
                description:
                  'Relating to software packages installed on hosts. Use this category to visualize and analyze inventory of software installed on various hosts, or to determine host vulnerability in the absence of vulnerability scan data.',
                expected_event_types: [
                  'access',
                  'change',
                  'deletion',
                  'info',
                  'installation',
                  'start',
                ],
                name: 'package',
              },
              {
                description:
                  'Use this category of events to visualize and analyze process-specific information such as lifecycle events or process ancestry.',
                expected_event_types: ['access', 'change', 'end', 'info', 'start'],
                name: 'process',
              },
              {
                description:
                  'Having to do with settings and assets stored in the Windows registry. Use this category to visualize and analyze activity such as registry access and modifications.',
                expected_event_types: ['access', 'change', 'creation', 'deletion'],
                name: 'registry',
              },
              {
                description:
                  'The session category is applied to events and metrics regarding logical persistent connections to hosts and services. Use this category to visualize and analyze interactive or automated persistent connections between assets. Data for this category may come from Windows Event logs, SSH logs, or stateless sessions such as HTTP cookie-based sessions, etc.',
                expected_event_types: ['start', 'end', 'info'],
                name: 'session',
              },
              {
                description:
                  "Use this category to visualize and analyze events describing threat actors' targets, motives, or behaviors.",
                expected_event_types: ['indicator'],
                name: 'threat',
              },
              {
                description:
                  'Relating to vulnerability scan results. Use this category to analyze vulnerabilities detected by Tenable, Qualys, internal scanners, and other vulnerability management sources.',
                expected_event_types: ['info'],
                name: 'vulnerability',
              },
              {
                description:
                  'Relating to web server access. Use this category to create a dashboard of web server/proxy activity from apache, IIS, nginx web servers, etc. Note: events from network observers such as Zeek http log may also be included in this category.',
                expected_event_types: ['access', 'error', 'info'],
                name: 'web',
              },
            ],
            dashed_name: 'event-category',
            description:
              'This is one of four ECS Categorization Fields, and indicates the second level in the ECS category hierarchy.\n`event.category` represents the "big buckets" of ECS categories. For example, filtering on `event.category:process` yields all events relating to process activity. This field is closely related to `event.type`, which is used as a subcategory.\nThis field is an array. This will allow proper categorization of some events that fall in multiple categories.',
            example: 'authentication',
            flat_name: 'event.category',
            ignore_above: 1024,
            level: 'core',
            name: 'category',
            normalize: ['array'],
            short: 'Event category. The second categorization field in the hierarchy.',
            type: 'keyword',
            indexFieldName: 'event.category',
            indexFieldType: 'keyword',
            indexInvalidValues: [
              {
                count: 2,
                fieldName: 'an_invalid_category',
              },
              {
                count: 1,
                fieldName: 'theory',
              },
            ],
            hasEcsMetadata: true,
            isEcsCompliant: false,
            isInSameFamily: true,
          },
          {
            dashed_name: 'host-name',
            description:
              'Name of the host.\nIt can contain what `hostname` returns on Unix systems, the fully qualified domain name, or a name specified by the user. The sender decides which value to use.',
            flat_name: 'host.name',
            ignore_above: 1024,
            level: 'core',
            name: 'name',
            normalize: [],
            short: 'Name of the host.',
            type: 'keyword',
            indexFieldName: 'host.name',
            indexFieldType: 'text',
            indexInvalidValues: [],
            hasEcsMetadata: true,
            isEcsCompliant: false,
            isInSameFamily: false,
          },
          {
            dashed_name: 'source-ip',
            description: 'IP address of the source (IPv4 or IPv6).',
            flat_name: 'source.ip',
            level: 'core',
            name: 'ip',
            normalize: [],
            short: 'IP address of the source.',
            type: 'ip',
            indexFieldName: 'source.ip',
            indexFieldType: 'text',
            indexInvalidValues: [],
            hasEcsMetadata: true,
            isEcsCompliant: false,
            isInSameFamily: false,
          },
        ],
      });
    });
  });

  describe('getMappingsProperties', () => {
    test('it returns the expected mapping properties', () => {
      expect(
        getMappingsProperties({
          indexes: mockIndicesGetMappingIndexMappingRecords,
          indexName: 'auditbeat-custom-index-1',
        })
      ).toEqual({
        '@timestamp': {
          type: 'date',
        },
        event: {
          properties: {
            category: {
              ignore_above: 1024,
              type: 'keyword',
            },
          },
        },
        host: {
          properties: {
            name: {
              fields: {
                keyword: {
                  ignore_above: 256,
                  type: 'keyword',
                },
              },
              type: 'text',
            },
          },
        },
        some: {
          properties: {
            field: {
              fields: {
                keyword: {
                  ignore_above: 256,
                  type: 'keyword',
                },
              },
              type: 'text',
            },
          },
        },
        source: {
          properties: {
            ip: {
              fields: {
                keyword: {
                  ignore_above: 256,
                  type: 'keyword',
                },
              },
              type: 'text',
            },
            port: {
              type: 'long',
            },
          },
        },
      });
    });

    test('it returns null when `indexes` is null', () => {
      expect(
        getMappingsProperties({
          indexes: null, // <--
          indexName: 'auditbeat-custom-index-1',
        })
      ).toBeNull();
    });

    test('it returns null when `indexName` does not exist in `indexes`', () => {
      expect(
        getMappingsProperties({
          indexes: mockIndicesGetMappingIndexMappingRecords,
          indexName: 'does-not-exist', // <--
        })
      ).toBeNull();
    });

    test('it returns null when `properties` does not exist in the mappings', () => {
      const missingProperties = {
        ...mockIndicesGetMappingIndexMappingRecords,
        foozle: {
          mappings: {}, // <-- does not have a `properties`
        },
      };

      expect(
        getMappingsProperties({
          indexes: missingProperties,
          indexName: 'foozle',
        })
      ).toBeNull();
    });
  });

  describe('hasAllDataFetchingCompleted', () => {
    test('it returns false when both the mappings and unallowed values are loading', () => {
      expect(
        hasAllDataFetchingCompleted({
          loadingMappings: true,
          loadingUnallowedValues: true,
        })
      ).toBe(false);
    });

    test('it returns false when mappings are loading, and unallowed values are NOT loading', () => {
      expect(
        hasAllDataFetchingCompleted({
          loadingMappings: true,
          loadingUnallowedValues: false,
        })
      ).toBe(false);
    });

    test('it returns false when mappings are NOT loading, and unallowed values are loading', () => {
      expect(
        hasAllDataFetchingCompleted({
          loadingMappings: false,
          loadingUnallowedValues: true,
        })
      ).toBe(false);
    });

    test('it returns true when both the mappings and unallowed values have finished loading', () => {
      expect(
        hasAllDataFetchingCompleted({
          loadingMappings: false,
          loadingUnallowedValues: false,
        })
      ).toBe(true);
    });
  });
});
