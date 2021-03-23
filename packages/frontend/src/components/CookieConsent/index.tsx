import { memo, useEffect, useState } from 'react';

import { useTranslation } from '@/utils/i18n/hooks';
import { useRouter } from 'next/router';

import cookies from 'js-cookie';
import * as styles from './styles';

import Modal from '@/components/Modal/portal';
import hyphens from '@/components/Hyphens';
import StyledLink from '@/components/StyledLink';
import Icon, { Icons } from '@/components/Icon';
import Button from './components/Button';

export default memo(
  function CookieConsent() {
    const [showModal, setShowModal] = useState<boolean>(false);

    const { pathname } = useRouter();
    const { t, distinctLocales } = useTranslation();

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
      <Modal id="cookie-consent" isOpen={showModal}>
        <hyphens.div css={styles.content}>
          <h2 css={styles.block}>
            {t('generic', 'cookie-consent', 'title')}
          </h2>

          <p css={styles.block}>
            {t('generic', 'cookie-consent', 'content')}
          </p>

          <small css={styles.block}>
            {t('generic', 'cookie-consent', 'small')}
            &nbsp;

            <StyledLink href="/legal/privacy-policy" ccss={styles.link}>
              {t('pages', 'privacy-policy', 'title')}
            </StyledLink>
          </small>

          <p css={styles.block}>
            <Button
              label={t('generic', 'cookie-consent', 'agree')}
              onAction={acceptCookies}
            />
          </p>

          <div css={styles.languageChooser}>
            <Icon
              icon={Icons.Language}
              ccss={styles.language}
            />

            {distinctLocales.map((locale) => (
              <StyledLink
                ccss={styles.language}
                href={pathname}
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
