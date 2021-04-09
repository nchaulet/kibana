/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

export const ecsFieldMap = {
  '@timestamp': {
    type: 'date',
    array: false,
    required: true,
  },
  'agent.build.original': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'agent.ephemeral_id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'agent.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'agent.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'agent.type': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'agent.version': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'client.address': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'client.as.number': {
    type: 'long',
    array: false,
    required: false,
  },
  'client.as.organization.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'client.bytes': {
    type: 'long',
    array: false,
    required: false,
  },
  'client.domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'client.geo.city_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'client.geo.continent_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'client.geo.country_iso_code': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'client.geo.country_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'client.geo.location': {
    type: 'geo_point',
    array: false,
    required: false,
  },
  'client.geo.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'client.geo.region_iso_code': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'client.geo.region_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'client.ip': {
    type: 'ip',
    array: false,
    required: false,
  },
  'client.mac': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'client.nat.ip': {
    type: 'ip',
    array: false,
    required: false,
  },
  'client.nat.port': {
    type: 'long',
    array: false,
    required: false,
  },
  'client.packets': {
    type: 'long',
    array: false,
    required: false,
  },
  'client.port': {
    type: 'long',
    array: false,
    required: false,
  },
  'client.registered_domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'client.subdomain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'client.top_level_domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'client.user.domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'client.user.email': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'client.user.full_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'client.user.group.domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'client.user.group.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'client.user.group.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'client.user.hash': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'client.user.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'client.user.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'client.user.roles': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'cloud.account.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'cloud.account.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'cloud.availability_zone': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'cloud.instance.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'cloud.instance.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'cloud.machine.type': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'cloud.project.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'cloud.project.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'cloud.provider': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'cloud.region': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'container.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'container.image.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'container.image.tag': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'container.labels': {
    type: 'object',
    array: false,
    required: false,
  },
  'container.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'container.runtime': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'destination.address': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'destination.as.number': {
    type: 'long',
    array: false,
    required: false,
  },
  'destination.as.organization.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'destination.bytes': {
    type: 'long',
    array: false,
    required: false,
  },
  'destination.domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'destination.geo.city_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'destination.geo.continent_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'destination.geo.country_iso_code': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'destination.geo.country_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'destination.geo.location': {
    type: 'geo_point',
    array: false,
    required: false,
  },
  'destination.geo.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'destination.geo.region_iso_code': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'destination.geo.region_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'destination.ip': {
    type: 'ip',
    array: false,
    required: false,
  },
  'destination.mac': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'destination.nat.ip': {
    type: 'ip',
    array: false,
    required: false,
  },
  'destination.nat.port': {
    type: 'long',
    array: false,
    required: false,
  },
  'destination.packets': {
    type: 'long',
    array: false,
    required: false,
  },
  'destination.port': {
    type: 'long',
    array: false,
    required: false,
  },
  'destination.registered_domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'destination.subdomain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'destination.top_level_domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'destination.user.domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'destination.user.email': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'destination.user.full_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'destination.user.group.domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'destination.user.group.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'destination.user.group.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'destination.user.hash': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'destination.user.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'destination.user.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'destination.user.roles': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'dll.code_signature.exists': {
    type: 'boolean',
    array: false,
    required: false,
  },
  'dll.code_signature.status': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'dll.code_signature.subject_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'dll.code_signature.trusted': {
    type: 'boolean',
    array: false,
    required: false,
  },
  'dll.code_signature.valid': {
    type: 'boolean',
    array: false,
    required: false,
  },
  'dll.hash.md5': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'dll.hash.sha1': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'dll.hash.sha256': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'dll.hash.sha512': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'dll.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'dll.path': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'dll.pe.architecture': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'dll.pe.company': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'dll.pe.description': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'dll.pe.file_version': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'dll.pe.imphash': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'dll.pe.original_file_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'dll.pe.product': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'dns.answers': {
    type: 'object',
    array: true,
    required: false,
  },
  'dns.answers.class': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'dns.answers.data': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'dns.answers.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'dns.answers.ttl': {
    type: 'long',
    array: false,
    required: false,
  },
  'dns.answers.type': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'dns.header_flags': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'dns.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'dns.op_code': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'dns.question.class': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'dns.question.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'dns.question.registered_domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'dns.question.subdomain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'dns.question.top_level_domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'dns.question.type': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'dns.resolved_ip': {
    type: 'ip',
    array: true,
    required: false,
  },
  'dns.response_code': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'dns.type': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'ecs.version': {
    type: 'keyword',
    array: false,
    required: true,
  },
  'error.code': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'error.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'error.message': {
    type: 'text',
    array: false,
    required: false,
  },
  'error.stack_trace': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'error.type': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'event.action': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'event.category': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'event.code': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'event.created': {
    type: 'date',
    array: false,
    required: false,
  },
  'event.dataset': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'event.duration': {
    type: 'long',
    array: false,
    required: false,
  },
  'event.end': {
    type: 'date',
    array: false,
    required: false,
  },
  'event.hash': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'event.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'event.ingested': {
    type: 'date',
    array: false,
    required: false,
  },
  'event.kind': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'event.module': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'event.original': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'event.outcome': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'event.provider': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'event.reason': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'event.reference': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'event.risk_score': {
    type: 'float',
    array: false,
    required: false,
  },
  'event.risk_score_norm': {
    type: 'float',
    array: false,
    required: false,
  },
  'event.sequence': {
    type: 'long',
    array: false,
    required: false,
  },
  'event.severity': {
    type: 'long',
    array: false,
    required: false,
  },
  'event.start': {
    type: 'date',
    array: false,
    required: false,
  },
  'event.timezone': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'event.type': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'event.url': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.accessed': {
    type: 'date',
    array: false,
    required: false,
  },
  'file.attributes': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'file.code_signature.exists': {
    type: 'boolean',
    array: false,
    required: false,
  },
  'file.code_signature.status': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.code_signature.subject_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.code_signature.trusted': {
    type: 'boolean',
    array: false,
    required: false,
  },
  'file.code_signature.valid': {
    type: 'boolean',
    array: false,
    required: false,
  },
  'file.created': {
    type: 'date',
    array: false,
    required: false,
  },
  'file.ctime': {
    type: 'date',
    array: false,
    required: false,
  },
  'file.device': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.directory': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.drive_letter': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.extension': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.gid': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.group': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.hash.md5': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.hash.sha1': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.hash.sha256': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.hash.sha512': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.inode': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.mime_type': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.mode': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.mtime': {
    type: 'date',
    array: false,
    required: false,
  },
  'file.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.owner': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.path': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.pe.architecture': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.pe.company': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.pe.description': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.pe.file_version': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.pe.imphash': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.pe.original_file_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.pe.product': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.size': {
    type: 'long',
    array: false,
    required: false,
  },
  'file.target_path': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.type': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.uid': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.x509.alternative_names': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'file.x509.issuer.common_name': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'file.x509.issuer.country': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'file.x509.issuer.distinguished_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.x509.issuer.locality': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'file.x509.issuer.organization': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'file.x509.issuer.organizational_unit': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'file.x509.issuer.state_or_province': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'file.x509.not_after': {
    type: 'date',
    array: false,
    required: false,
  },
  'file.x509.not_before': {
    type: 'date',
    array: false,
    required: false,
  },
  'file.x509.public_key_algorithm': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.x509.public_key_curve': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.x509.public_key_exponent': {
    type: 'long',
    array: false,
    required: false,
  },
  'file.x509.public_key_size': {
    type: 'long',
    array: false,
    required: false,
  },
  'file.x509.serial_number': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.x509.signature_algorithm': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.x509.subject.common_name': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'file.x509.subject.country': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'file.x509.subject.distinguished_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'file.x509.subject.locality': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'file.x509.subject.organization': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'file.x509.subject.organizational_unit': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'file.x509.subject.state_or_province': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'file.x509.version_number': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'group.domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'group.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'group.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'host.architecture': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'host.domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'host.geo.city_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'host.geo.continent_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'host.geo.country_iso_code': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'host.geo.country_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'host.geo.location': {
    type: 'geo_point',
    array: false,
    required: false,
  },
  'host.geo.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'host.geo.region_iso_code': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'host.geo.region_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'host.hostname': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'host.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'host.ip': {
    type: 'ip',
    array: true,
    required: false,
  },
  'host.mac': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'host.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'host.os.family': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'host.os.full': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'host.os.kernel': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'host.os.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'host.os.platform': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'host.os.type': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'host.os.version': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'host.type': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'host.uptime': {
    type: 'long',
    array: false,
    required: false,
  },
  'host.user.domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'host.user.email': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'host.user.full_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'host.user.group.domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'host.user.group.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'host.user.group.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'host.user.hash': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'host.user.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'host.user.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'host.user.roles': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'http.request.body.bytes': {
    type: 'long',
    array: false,
    required: false,
  },
  'http.request.body.content': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'http.request.bytes': {
    type: 'long',
    array: false,
    required: false,
  },
  'http.request.method': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'http.request.mime_type': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'http.request.referrer': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'http.response.body.bytes': {
    type: 'long',
    array: false,
    required: false,
  },
  'http.response.body.content': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'http.response.bytes': {
    type: 'long',
    array: false,
    required: false,
  },
  'http.response.mime_type': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'http.response.status_code': {
    type: 'long',
    array: false,
    required: false,
  },
  'http.version': {
    type: 'keyword',
    array: false,
    required: false,
  },
  labels: {
    type: 'object',
    array: false,
    required: false,
  },
  'log.file.path': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'log.level': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'log.logger': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'log.origin.file.line': {
    type: 'integer',
    array: false,
    required: false,
  },
  'log.origin.file.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'log.origin.function': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'log.original': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'log.syslog': {
    type: 'object',
    array: false,
    required: false,
  },
  'log.syslog.facility.code': {
    type: 'long',
    array: false,
    required: false,
  },
  'log.syslog.facility.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'log.syslog.priority': {
    type: 'long',
    array: false,
    required: false,
  },
  'log.syslog.severity.code': {
    type: 'long',
    array: false,
    required: false,
  },
  'log.syslog.severity.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  message: {
    type: 'text',
    array: false,
    required: false,
  },
  'network.application': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'network.bytes': {
    type: 'long',
    array: false,
    required: false,
  },
  'network.community_id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'network.direction': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'network.forwarded_ip': {
    type: 'ip',
    array: false,
    required: false,
  },
  'network.iana_number': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'network.inner': {
    type: 'object',
    array: false,
    required: false,
  },
  'network.inner.vlan.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'network.inner.vlan.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'network.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'network.packets': {
    type: 'long',
    array: false,
    required: false,
  },
  'network.protocol': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'network.transport': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'network.type': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'network.vlan.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'network.vlan.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.egress': {
    type: 'object',
    array: false,
    required: false,
  },
  'observer.egress.interface.alias': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.egress.interface.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.egress.interface.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.egress.vlan.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.egress.vlan.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.egress.zone': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.geo.city_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.geo.continent_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.geo.country_iso_code': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.geo.country_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.geo.location': {
    type: 'geo_point',
    array: false,
    required: false,
  },
  'observer.geo.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.geo.region_iso_code': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.geo.region_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.hostname': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.ingress': {
    type: 'object',
    array: false,
    required: false,
  },
  'observer.ingress.interface.alias': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.ingress.interface.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.ingress.interface.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.ingress.vlan.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.ingress.vlan.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.ingress.zone': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.ip': {
    type: 'ip',
    array: true,
    required: false,
  },
  'observer.mac': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'observer.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.os.family': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.os.full': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.os.kernel': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.os.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.os.platform': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.os.type': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.os.version': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.product': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.serial_number': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.type': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.vendor': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'observer.version': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'organization.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'organization.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'package.architecture': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'package.build_version': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'package.checksum': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'package.description': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'package.install_scope': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'package.installed': {
    type: 'date',
    array: false,
    required: false,
  },
  'package.license': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'package.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'package.path': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'package.reference': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'package.size': {
    type: 'long',
    array: false,
    required: false,
  },
  'package.type': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'package.version': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.args': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'process.args_count': {
    type: 'long',
    array: false,
    required: false,
  },
  'process.code_signature.exists': {
    type: 'boolean',
    array: false,
    required: false,
  },
  'process.code_signature.status': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.code_signature.subject_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.code_signature.trusted': {
    type: 'boolean',
    array: false,
    required: false,
  },
  'process.code_signature.valid': {
    type: 'boolean',
    array: false,
    required: false,
  },
  'process.command_line': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.entity_id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.executable': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.exit_code': {
    type: 'long',
    array: false,
    required: false,
  },
  'process.hash.md5': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.hash.sha1': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.hash.sha256': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.hash.sha512': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.parent.args': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'process.parent.args_count': {
    type: 'long',
    array: false,
    required: false,
  },
  'process.parent.code_signature.exists': {
    type: 'boolean',
    array: false,
    required: false,
  },
  'process.parent.code_signature.status': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.parent.code_signature.subject_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.parent.code_signature.trusted': {
    type: 'boolean',
    array: false,
    required: false,
  },
  'process.parent.code_signature.valid': {
    type: 'boolean',
    array: false,
    required: false,
  },
  'process.parent.command_line': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.parent.entity_id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.parent.executable': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.parent.exit_code': {
    type: 'long',
    array: false,
    required: false,
  },
  'process.parent.hash.md5': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.parent.hash.sha1': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.parent.hash.sha256': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.parent.hash.sha512': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.parent.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.parent.pe.architecture': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.parent.pe.company': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.parent.pe.description': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.parent.pe.file_version': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.parent.pe.imphash': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.parent.pe.original_file_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.parent.pe.product': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.parent.pgid': {
    type: 'long',
    array: false,
    required: false,
  },
  'process.parent.pid': {
    type: 'long',
    array: false,
    required: false,
  },
  'process.parent.ppid': {
    type: 'long',
    array: false,
    required: false,
  },
  'process.parent.start': {
    type: 'date',
    array: false,
    required: false,
  },
  'process.parent.thread.id': {
    type: 'long',
    array: false,
    required: false,
  },
  'process.parent.thread.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.parent.title': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.parent.uptime': {
    type: 'long',
    array: false,
    required: false,
  },
  'process.parent.working_directory': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.pe.architecture': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.pe.company': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.pe.description': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.pe.file_version': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.pe.imphash': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.pe.original_file_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.pe.product': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.pgid': {
    type: 'long',
    array: false,
    required: false,
  },
  'process.pid': {
    type: 'long',
    array: false,
    required: false,
  },
  'process.ppid': {
    type: 'long',
    array: false,
    required: false,
  },
  'process.start': {
    type: 'date',
    array: false,
    required: false,
  },
  'process.thread.id': {
    type: 'long',
    array: false,
    required: false,
  },
  'process.thread.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.title': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'process.uptime': {
    type: 'long',
    array: false,
    required: false,
  },
  'process.working_directory': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'registry.data.bytes': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'registry.data.strings': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'registry.data.type': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'registry.hive': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'registry.key': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'registry.path': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'registry.value': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'related.hash': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'related.hosts': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'related.ip': {
    type: 'ip',
    array: true,
    required: false,
  },
  'related.user': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'rule.author': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'rule.category': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'rule.description': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'rule.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'rule.license': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'rule.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'rule.reference': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'rule.ruleset': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'rule.uuid': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'rule.version': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'server.address': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'server.as.number': {
    type: 'long',
    array: false,
    required: false,
  },
  'server.as.organization.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'server.bytes': {
    type: 'long',
    array: false,
    required: false,
  },
  'server.domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'server.geo.city_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'server.geo.continent_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'server.geo.country_iso_code': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'server.geo.country_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'server.geo.location': {
    type: 'geo_point',
    array: false,
    required: false,
  },
  'server.geo.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'server.geo.region_iso_code': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'server.geo.region_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'server.ip': {
    type: 'ip',
    array: false,
    required: false,
  },
  'server.mac': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'server.nat.ip': {
    type: 'ip',
    array: false,
    required: false,
  },
  'server.nat.port': {
    type: 'long',
    array: false,
    required: false,
  },
  'server.packets': {
    type: 'long',
    array: false,
    required: false,
  },
  'server.port': {
    type: 'long',
    array: false,
    required: false,
  },
  'server.registered_domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'server.subdomain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'server.top_level_domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'server.user.domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'server.user.email': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'server.user.full_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'server.user.group.domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'server.user.group.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'server.user.group.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'server.user.hash': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'server.user.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'server.user.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'server.user.roles': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'service.ephemeral_id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'service.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'service.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'service.node.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'service.state': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'service.type': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'service.version': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'source.address': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'source.as.number': {
    type: 'long',
    array: false,
    required: false,
  },
  'source.as.organization.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'source.bytes': {
    type: 'long',
    array: false,
    required: false,
  },
  'source.domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'source.geo.city_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'source.geo.continent_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'source.geo.country_iso_code': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'source.geo.country_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'source.geo.location': {
    type: 'geo_point',
    array: false,
    required: false,
  },
  'source.geo.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'source.geo.region_iso_code': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'source.geo.region_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'source.ip': {
    type: 'ip',
    array: false,
    required: false,
  },
  'source.mac': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'source.nat.ip': {
    type: 'ip',
    array: false,
    required: false,
  },
  'source.nat.port': {
    type: 'long',
    array: false,
    required: false,
  },
  'source.packets': {
    type: 'long',
    array: false,
    required: false,
  },
  'source.port': {
    type: 'long',
    array: false,
    required: false,
  },
  'source.registered_domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'source.subdomain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'source.top_level_domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'source.user.domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'source.user.email': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'source.user.full_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'source.user.group.domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'source.user.group.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'source.user.group.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'source.user.hash': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'source.user.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'source.user.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'source.user.roles': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'span.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  tags: {
    type: 'keyword',
    array: true,
    required: false,
  },
  'threat.framework': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'threat.tactic.id': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'threat.tactic.name': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'threat.tactic.reference': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'threat.technique.id': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'threat.technique.name': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'threat.technique.reference': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'threat.technique.subtechnique.id': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'threat.technique.subtechnique.name': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'threat.technique.subtechnique.reference': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'tls.cipher': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.client.certificate': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.client.certificate_chain': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'tls.client.hash.md5': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.client.hash.sha1': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.client.hash.sha256': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.client.issuer': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.client.ja3': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.client.not_after': {
    type: 'date',
    array: false,
    required: false,
  },
  'tls.client.not_before': {
    type: 'date',
    array: false,
    required: false,
  },
  'tls.client.server_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.client.subject': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.client.supported_ciphers': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'tls.client.x509.alternative_names': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'tls.client.x509.issuer.common_name': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'tls.client.x509.issuer.country': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'tls.client.x509.issuer.distinguished_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.client.x509.issuer.locality': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'tls.client.x509.issuer.organization': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'tls.client.x509.issuer.organizational_unit': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'tls.client.x509.issuer.state_or_province': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'tls.client.x509.not_after': {
    type: 'date',
    array: false,
    required: false,
  },
  'tls.client.x509.not_before': {
    type: 'date',
    array: false,
    required: false,
  },
  'tls.client.x509.public_key_algorithm': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.client.x509.public_key_curve': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.client.x509.public_key_exponent': {
    type: 'long',
    array: false,
    required: false,
  },
  'tls.client.x509.public_key_size': {
    type: 'long',
    array: false,
    required: false,
  },
  'tls.client.x509.serial_number': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.client.x509.signature_algorithm': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.client.x509.subject.common_name': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'tls.client.x509.subject.country': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'tls.client.x509.subject.distinguished_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.client.x509.subject.locality': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'tls.client.x509.subject.organization': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'tls.client.x509.subject.organizational_unit': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'tls.client.x509.subject.state_or_province': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'tls.client.x509.version_number': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.curve': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.established': {
    type: 'boolean',
    array: false,
    required: false,
  },
  'tls.next_protocol': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.resumed': {
    type: 'boolean',
    array: false,
    required: false,
  },
  'tls.server.certificate': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.server.certificate_chain': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'tls.server.hash.md5': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.server.hash.sha1': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.server.hash.sha256': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.server.issuer': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.server.ja3s': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.server.not_after': {
    type: 'date',
    array: false,
    required: false,
  },
  'tls.server.not_before': {
    type: 'date',
    array: false,
    required: false,
  },
  'tls.server.subject': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.server.x509.alternative_names': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'tls.server.x509.issuer.common_name': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'tls.server.x509.issuer.country': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'tls.server.x509.issuer.distinguished_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.server.x509.issuer.locality': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'tls.server.x509.issuer.organization': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'tls.server.x509.issuer.organizational_unit': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'tls.server.x509.issuer.state_or_province': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'tls.server.x509.not_after': {
    type: 'date',
    array: false,
    required: false,
  },
  'tls.server.x509.not_before': {
    type: 'date',
    array: false,
    required: false,
  },
  'tls.server.x509.public_key_algorithm': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.server.x509.public_key_curve': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.server.x509.public_key_exponent': {
    type: 'long',
    array: false,
    required: false,
  },
  'tls.server.x509.public_key_size': {
    type: 'long',
    array: false,
    required: false,
  },
  'tls.server.x509.serial_number': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.server.x509.signature_algorithm': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.server.x509.subject.common_name': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'tls.server.x509.subject.country': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'tls.server.x509.subject.distinguished_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.server.x509.subject.locality': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'tls.server.x509.subject.organization': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'tls.server.x509.subject.organizational_unit': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'tls.server.x509.subject.state_or_province': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'tls.server.x509.version_number': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.version': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'tls.version_protocol': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'trace.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'transaction.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'url.domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'url.extension': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'url.fragment': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'url.full': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'url.original': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'url.password': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'url.path': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'url.port': {
    type: 'long',
    array: false,
    required: false,
  },
  'url.query': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'url.registered_domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'url.scheme': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'url.subdomain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'url.top_level_domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'url.username': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.changes.domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.changes.email': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.changes.full_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.changes.group.domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.changes.group.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.changes.group.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.changes.hash': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.changes.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.changes.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.changes.roles': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'user.domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.effective.domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.effective.email': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.effective.full_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.effective.group.domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.effective.group.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.effective.group.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.effective.hash': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.effective.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.effective.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.effective.roles': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'user.email': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.full_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.group.domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.group.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.group.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.hash': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.roles': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'user.target.domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.target.email': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.target.full_name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.target.group.domain': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.target.group.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.target.group.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.target.hash': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.target.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.target.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user.target.roles': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'user_agent.device.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user_agent.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user_agent.original': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user_agent.os.family': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user_agent.os.full': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user_agent.os.kernel': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user_agent.os.name': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user_agent.os.platform': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user_agent.os.type': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user_agent.os.version': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'user_agent.version': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'vulnerability.category': {
    type: 'keyword',
    array: true,
    required: false,
  },
  'vulnerability.classification': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'vulnerability.description': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'vulnerability.enumeration': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'vulnerability.id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'vulnerability.reference': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'vulnerability.report_id': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'vulnerability.scanner.vendor': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'vulnerability.score.base': {
    type: 'float',
    array: false,
    required: false,
  },
  'vulnerability.score.environmental': {
    type: 'float',
    array: false,
    required: false,
  },
  'vulnerability.score.temporal': {
    type: 'float',
    array: false,
    required: false,
  },
  'vulnerability.score.version': {
    type: 'keyword',
    array: false,
    required: false,
  },
  'vulnerability.severity': {
    type: 'keyword',
    array: false,
    required: false,
  },
} as const;
