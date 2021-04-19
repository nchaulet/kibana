/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useCallback, useState } from 'react';
import {
  EuiButton,
  EuiCheckbox,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiLink,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';
import { FormattedMessage } from '@kbn/i18n/react';
import { i18n } from '@kbn/i18n';

import { sendPutSettings, useLink, useStartServices } from '../../../hooks';

interface Props {
  onClose: () => void;
  isCloud: boolean;
}

export const FleetServerUpgradeModal: React.FunctionComponent<Props> = ({ onClose, isCloud }) => {
  const { getAssetsPath } = useLink();
  const { notifications } = useStartServices();

  const [checked, setChecked] = useState(false);
  const onChange = useCallback(async () => {
    try {
      setChecked(!checked);
      await sendPutSettings({
        has_seen_fleet_migration_notice: !checked,
      });
    } catch (error) {
      notifications.toasts.addError(error, {
        title: i18n.translate('xpack.fleet.fleetServerUpgradeModal.failedUpdateTitle', {
          defaultMessage: `Error updating the settings`,
        }),
      });
    }
  }, [checked, setChecked, notifications]);

  return (
    <EuiModal onClose={onClose}>
      <EuiModalHeader>
        <EuiModalHeaderTitle>
          <FormattedMessage
            id="xpack.fleet.fleetServerUpgradeModal.modalTitle"
            defaultMessage="This version of Fleet requires a Fleet Server"
          />
        </EuiModalHeaderTitle>
      </EuiModalHeader>
      <EuiModalBody>
        <EuiImage
          src={getAssetsPath('./announcement.jpg')}
          alt={i18n.translate('xpack.fleet.fleetServerUpgradeModal.announcementImg', {
            defaultMessage: 'Announcement Image',
          })}
        />
        <EuiSpacer size="m" />
        <EuiText>
          {isCloud ? (
            <FormattedMessage
              id="xpack.fleet.fleetServerUpgradeModal.textPart1Cloud"
              defaultMessage="Fleet Server is now available and it provides improved scalability and security. If you already had APM on Elastic Cloud, we've upgraded it to APM & Fleet. {strong} To continue using Fleet, you must install a Fleet Server and the new version of Elastic Agent on each host. Learn more in our {link}."
              values={{
                strong: (
                  <strong>
                    <FormattedMessage
                      id="xpack.fleet.fleetServerUpgradeModal.existingAgentText"
                      defaultMessage="Your existing Elastic Agents have been automatically unenrolled and have stopped sending data."
                    />
                  </strong>
                ),
                link: (
                  <EuiLink
                    href="https://www.elastic.co/guide/en/fleet/current/upgrade-elastic-agent.html"
                    external={true}
                  >
                    <FormattedMessage
                      id="xpack.fleet.fleetServerUpgradeModal.fleetServerMigrationGuide"
                      defaultMessage="Fleet Server migration guide"
                    />
                  </EuiLink>
                ),
              }}
            />
          ) : (
            <FormattedMessage
              id="xpack.fleet.fleetServerUpgradeModal.textPart1OnPremise"
              defaultMessage="Fleet Server is now available and it provides improved scalability and security. {strong} To continue using Fleet, you must install a Fleet Server and the new version of Elastic Agent on each host. Learn more in our {link}."
              values={{
                strong: (
                  <strong>
                    <FormattedMessage
                      id="xpack.fleet.fleetServerUpgradeModal.existingAgentText"
                      defaultMessage="Your existing Elastic Agents have been automatically unenrolled and have stopped sending data."
                    />
                  </strong>
                ),
                link: (
                  <EuiLink
                    href="https://www.elastic.co/guide/en/fleet/current/upgrade-elastic-agent.html"
                    external={true}
                  >
                    <FormattedMessage
                      id="xpack.fleet.fleetServerUpgradeModal.fleetServerMigrationGuide"
                      defaultMessage="Fleet Server migration guide"
                    />
                  </EuiLink>
                ),
              }}
            />
          )}
        </EuiText>
        <EuiSpacer size="l" />
        <EuiText>
          <FormattedMessage
            id="xpack.fleet.fleetServerUpgradeModal.textPart1"
            defaultMessage="This is a breaking change, which is why we are making it in a beta release. We are sorry for the inconvenience. Please share {link} if you have questions or need help."
            values={{
              link: (
                <EuiLink href="https://ela.st/fleet-feedback">
                  <FormattedMessage
                    id="xpack.fleet.fleetServerUpgradeModal.fleetFeedbackLink"
                    defaultMessage="feedback"
                  />
                </EuiLink>
              ),
            }}
          />
        </EuiText>
      </EuiModalBody>
      <EuiModalFooter>
        <EuiFlexGroup justifyContent="spaceBetween">
          <EuiFlexItem grow={false}>
            <EuiCheckbox
              id="fleetServerModalCheckbox"
              label={i18n.translate('xpack.fleet.fleetServerUpgradeModal.checkboxLabel', {
                defaultMessage: 'Do not show this message again',
              })}
              checked={checked}
              onChange={onChange}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton fill onClick={onClose}>
              <FormattedMessage
                id="xpack.fleet.fleetServerUpgradeModal.closeButton"
                defaultMessage="Close and get started"
              />
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiModalFooter>
    </EuiModal>
  );
};
