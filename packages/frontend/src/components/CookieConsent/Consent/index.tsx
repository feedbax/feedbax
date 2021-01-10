import React from 'react';

import useTranslation from '~hooks/components/I18n/use-translation';
import useLocation from '~hooks/components/I18n/use-location';

import { useFela } from 'react-fela';
import { rules } from './styles';

import LocaleLink from '~components/I18n/LocaleLink';
import Icon, { Icons } from '~components/Icon';
import Modal from '~components/Modal';
import hyphens from '~components/Hyphens';

import type { ConsentProps } from '../types';

type ActionEvent = (
  React.KeyboardEvent<HTMLSpanElement>
  | React.MouseEvent<HTMLSpanElement, MouseEvent>
);

type ButtonProps = {
  onAction: (event: ActionEvent) => void;
  label: string;
};

const Button = React.memo(
  ({ onAction, label }: ButtonProps) => {
    const { css } = useFela();

    return (
      <span
        className={css(rules.button)}

        onClick={onAction}
        onKeyPress={onAction}

        role="button"
        tabIndex={0}
      >
        {label}
      </span>
    );
  },
);

const Consent = React.memo(
  ({ show, onAgree }: ConsentProps) => {
    const { css } = useFela();

    const { t, locale, locales } = useTranslation();
    const pathname = useLocation();

    const $locales = locales.filter(($locale) => $locale !== locale);

    return (
      <Modal isOpen={show}>
        <hyphens.div style={rules.content}>
          <h2 className={css(rules.block)}>
            {t('generic', 'cookie_consent', 'title')}
          </h2>

          <p className={css(rules.block)}>
            {t('generic', 'cookie_consent', 'content')}
          </p>

          <small className={css(rules.block)}>
            {t('generic', 'cookie_consent', 'small')}

            &nbsp;

            <LocaleLink
              to="/legal/privacy-policy"
              className={css(rules.link)}
            >
              {t('generic', 'footer', 'privacy_policy')}
              {' & '}
              {t('generic', 'footer', 'imprint')}
            </LocaleLink>
          </small>

          <p className={css(rules.block)}>
            <Button
              label={t('generic', 'cookie_consent', 'agree')}
              onAction={onAgree}
            />
          </p>

          <div className={css(rules.languageChooser)}>
            <Icon
              icon={Icons.Language}
              customRule={rules.language}
            />

            {$locales.map(($locale) => (
              <LocaleLink
                className={css(rules.language, rules.link)}
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
