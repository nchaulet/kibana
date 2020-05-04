/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import React, { useState } from 'react';
import {
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiSpacer,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
  EuiButton,
  EuiFlyoutFooter,
  EuiLink,
} from '@elastic/eui';
import { FormattedMessage } from '@kbn/i18n/react';
import { AgentConfig } from '../../../../../types';
import { APIKeySelection } from './key_selection';
import { EnrollmentInstructions } from './instructions';
import { useFleetStatus } from '../../../../../hooks/use_fleet_status';
import { useLink } from '../../../../../hooks';
import { FLEET_PATH } from '../../../../../constants';

interface Props {
  onClose: () => void;
  agentConfigs: AgentConfig[];
}

export const AgentEnrollmentFlyout: React.FunctionComponent<Props> = ({
  onClose,
  agentConfigs = [],
}) => {
  const fleetStatus = useFleetStatus();
  const [selectedAPIKeyId, setSelectedAPIKeyId] = useState<string | undefined>();

  const fleetLink = useLink(FLEET_PATH);

  return (
    <EuiFlyout onClose={onClose} size="l" maxWidth={640}>
      <EuiFlyoutHeader hasBorder aria-labelledby="FleetAgentEnrollmentFlyoutTitle">
        <EuiTitle size="m">
          <h2 id="FleetAgentEnrollmentFlyoutTitle">
            <FormattedMessage
              id="xpack.ingestManager.agentEnrollment.flyoutTitle"
              defaultMessage="Enroll new agent"
            />
          </h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        {fleetStatus.isReady ? (
          <>
            <APIKeySelection
              agentConfigs={agentConfigs}
              onKeyChange={keyId => setSelectedAPIKeyId(keyId)}
            />
            <EuiSpacer size="l" />
            <EnrollmentInstructions selectedAPIKeyId={selectedAPIKeyId} />
          </>
        ) : (
          <>
            <FormattedMessage
              id="xpack.ingestManager.agentEnrollment.fleetNotInitializedText"
              defaultMessage="Fleet needs to be set up before agents can be enrolled. {link}"
              values={{
                link: (
                  <EuiLink href={fleetLink}>
                    <FormattedMessage
                      id="xpack.ingestManager.agentEnrollment.goToFleetButton"
                      defaultMessage="Go to Fleet."
                    />
                  </EuiLink>
                ),
              }}
            />
          </>
        )}
      </EuiFlyoutBody>
      <EuiFlyoutFooter>
        <EuiFlexGroup justifyContent="spaceBetween">
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty iconType="cross" onClick={onClose} flush="left">
              <FormattedMessage
                id="xpack.ingestManager.agentEnrollment.cancelButtonLabel"
                defaultMessage="Cancel"
              />
            </EuiButtonEmpty>
          </EuiFlexItem>
          {fleetStatus.isReady && (
            <EuiFlexItem grow={false}>
              <EuiButton fill onClick={onClose}>
                <FormattedMessage
                  id="xpack.ingestManager.agentEnrollment.continueButtonLabel"
                  defaultMessage="Continue"
                />
              </EuiButton>
            </EuiFlexItem>
          )}
        </EuiFlexGroup>
      </EuiFlyoutFooter>
    </EuiFlyout>
  );
};
