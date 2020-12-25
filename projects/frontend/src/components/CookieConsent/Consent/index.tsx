/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { jsx, css } from '@emotion/react';
import { stylesConsent, stylesConsentContent } from './styles';

import { AnimatePresence, motion } from 'framer-motion';

import LocaleLink from '~components/I18n/LocaleLink';
import hyphens from '~components/Hyphens';

import useTranslation from '~hooks/components/I18n/use-translation';

import type { Variants } from 'framer-motion';
import type { ConsentComponent } from '../types';

const variants: Variants = {
  initial: { opacity: 0, backdropFilter: 'blur(0px)' },
  animate: { opacity: 1, backdropFilter: 'blur(5px)' },
  exit: { opacity: 0, backdropFilter: 'blur(0px)' },
};

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

const Consent: ConsentComponent = React.memo(
  ({ show, mounted, onAgree }) => {
    const mountedRef = useRef(mounted);
    const { t } = useTranslation();

    useEffect(() => mountedRef.current(), []);

    return createPortal((
      <AnimatePresence>
        {show && (
          <motion.div
            css={stylesConsent}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    ), document.body);
  },
);

export default Consent;
