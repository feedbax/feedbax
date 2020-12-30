/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from 'react';

import useTranslation from '~hooks/components/I18n/use-translation';
import useLocation from '~hooks/components/I18n/use-location';

import { jsx, css } from '@emotion/react';
import { cssVar, fluidRange } from '~lib/css-helper';
import { stylesConsentContent, stylesLanguageChooser } from './styles';

import LocaleLink from '~components/I18n/LocaleLink';
import Icon, { Icons } from '~components/Icon';
import Modal from '~components/Modal';
import hyphens from '~components/Hyphens';

import type { ConsentProps } from '../types';

const stylesButton = css`
  display: inline-block;
  cursor: pointer;

  background-color: ${cssVar('--color-feedbax-secondary')};

  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      ['0.13rem', '0.13rem', '0.25rem'],
      ['0.31rem', '0.31rem', '0.63rem'],
    ] as const,

    css: ([paddingY, paddingX]) => ({
      padding: `${paddingY} ${paddingX}`,
    }),
  })}

  &:hover {
    opacity: 0.8;
  }
`;

type ActionEvent = (
  React.KeyboardEvent<HTMLSpanElement>
  | React.MouseEvent<HTMLSpanElement, MouseEvent>
);

type ButtonProps = {
  onAction: (event: ActionEvent) => void;
  label: string;
};

const Button = React.memo(
  ({ onAction, label }: ButtonProps) => (
    <span
      css={stylesButton}

      onClick={onAction}
      onKeyPress={onAction}

      role="button"
      tabIndex={0}
    >
      {label}
    </span>
  ),
);

const Consent = React.memo(
  ({ show, onAgree }: ConsentProps) => {
    const { t, locale, locales } = useTranslation();
    const pathname = useLocation();

    const $locales = locales.filter(($locale) => $locale !== locale);

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

          <p>
            <Button
              label={t('generic', 'cookie_consent', 'agree')}
              onAction={onAgree}
            />
          </p>

          <div css={stylesLanguageChooser}>
            <Icon icon={Icons.Language} />
            {$locales.map(($locale) => (
              <LocaleLink
                to={pathname}
                locale={$locale}
                key={$locale}
              >
                {t('generic', 'locales', $locale as 'de')}
              </LocaleLink>
            ))}
          </div>
        </hyphens.div>
      </Modal>
    );
  },
);

export default Consent;
