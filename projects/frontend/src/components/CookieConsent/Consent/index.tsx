/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from 'react';
import useTranslation from '~hooks/components/I18n/use-translation';

import { jsx, css } from '@emotion/react';
import { stylesConsentContent } from './styles';

import LocaleLink from '~components/I18n/LocaleLink';
import Modal from '~components/Modal';
import hyphens from '~components/Hyphens';

import type { ConsentProps } from '../types';

const stylesButton = css`
  display: inline-block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;

  cursor: pointer;
`;

type ActionEvent = (
  React.KeyboardEvent<HTMLDivElement>
  | React.MouseEvent<HTMLDivElement, MouseEvent>
);

type ButtonProps = {
  onAction: (event: ActionEvent) => void;
  label: string;
};

const Button = React.memo(
  ({ onAction, label }: ButtonProps) => (
    <div
      css={stylesButton}

      onClick={onAction}
      onKeyPress={onAction}

      role="button"
      tabIndex={0}
    >
      {label}
    </div>
  ),
);

const Consent = React.memo(
  ({ show, onAgree }: ConsentProps) => {
    const { t } = useTranslation();

    return (
      <Modal isOpen={show}>
        <hyphens.div style={stylesConsentContent}>
          <h2>{t('generic', 'cookie_consent', 'title')}</h2>
          <p>{t('generic', 'cookie_consent', 'content')}</p>

          <small>
            {t('generic', 'cookie_consent', 'small')}

            &nbsp;

            <LocaleLink to="/legal/privacy-policy">
              {t('generic', 'footer', 'privacy_policy')}
              {' & '}
              {t('generic', 'footer', 'imprint')}
            </LocaleLink>
          </small>

          <br />

          <Button
            label="Akzeptieren"
            onAction={onAgree}
          />
        </hyphens.div>
      </Modal>
    );
  },
);

export default Consent;
