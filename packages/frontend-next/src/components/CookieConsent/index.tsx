import { memo, useEffect, useState } from 'react';
import { useTranslation } from '@/i18n/hook';
import { useRouter } from 'next/router';

import cookies from 'js-cookie';

import { useFela } from 'react-fela';
import { rules } from '@/styles/components/CookieConsent';

import Modal from '@/components/Modal/dynamic';
import hyphens from '@/components/Hyphens';
import StyledLink from '@/components/StyledLink';
import Icon, { Icons } from '@/components/Icon';
import Button from './Button';

export default memo(
  function CookieConsent () {
    const [showModal, setShowModal] = useState<boolean>(false);

    const { pathname } = useRouter();
    const { t, distinctLocales } = useTranslation();
    const { css } = useFela();

    const acceptCookies = (): void => {
      cookies.set('consent-accepted', '1');
      setShowModal(false);
    };

    useEffect(() => {
      const cookieConsentAccepted = cookies.get('consent-accepted');
      const hasConsetAccepted = typeof cookieConsentAccepted !== 'undefined';

      setShowModal(!hasConsetAccepted);
    }, []);

    return (
      <Modal isOpen={showModal}>
        <hyphens.div customRule={rules.content}>
          <h2 className={css(rules.block)}>
            {t('generic', 'cookie_consent', 'title')}
          </h2>

          <p className={css(rules.block)}>
            {t('generic', 'cookie_consent', 'content')}
          </p>

          <small className={css(rules.block)}>
            {t('generic', 'cookie_consent', 'small')}
            &nbsp;

            <StyledLink href="/legal/privacy-policy" customRule={rules.link}>
              {t('generic', 'footer', 'privacy_policy')}
              {' & '}
              {t('generic', 'footer', 'imprint')}
            </StyledLink>
          </small>

          <p className={css(rules.block)}>
            <Button
              label={t('generic', 'cookie_consent', 'agree')}
              onAction={acceptCookies}
            />
          </p>

          <div className={css(rules.languageChooser)}>
            <Icon
              icon={Icons.Language}
              customRule={rules.language}
            />

            {distinctLocales.map((locale) => (
              <StyledLink
                href={pathname}
                customRule={rules.language}
                locale={locale}
                key={locale}
              >
                {t('generic', 'locales', locale as keyof Locales)}
              </StyledLink>
            ))}
          </div>
        </hyphens.div>
      </Modal>
    );
  },
);
