import React, { memo, useCallback } from 'react';
import cookies from 'js-cookie';

import { useTranslation } from '@/lib/i18n/hooks';
import { useRouter } from 'next/router';

import Modal from '@/components/Modal/dynamic';
import hyphens from '@/components/Hyphens';
import StyledLink from '@/components/StyledLink';
import Icon, { Icons } from '@/components/Icon';

import Button from './components/Button';
import styles from './styles.module.scss';

import { useModalVisibility, useScrollLock } from './hooks';

export default memo(
  function CookieConsent() {
    const [showModal, setShowModal] = useModalVisibility();
    const { pathname } = useRouter();
    const { t, distinctLocales } = useTranslation();

    const acceptCookies = (
      useCallback(
        (): void => {
          cookies.set('consent-accepted', '1');
          setShowModal(false);
        }, [],
      )
    );

    useScrollLock(showModal);

    return (
      <Modal isOpen={showModal}>
        <hyphens.div className={styles.content}>
          <h2 className={styles.block}>
            {t('generic', 'cookie-consent', 'title')}
          </h2>

          <p className={styles.block}>
            {t('generic', 'cookie-consent', 'content')}
          </p>

          <small className={styles.block}>
            {t('generic', 'cookie-consent', 'small')}
            &nbsp;

            <StyledLink href="/legal/privacy-policy" className={styles.link}>
              {t('pages', 'privacy-policy', 'title')}
            </StyledLink>
          </small>

          <p className={styles.block}>
            <Button
              label={t('generic', 'cookie-consent', 'agree')}
              onAction={acceptCookies}
            />
          </p>

          <div className={styles['language-chooser']}>
            <Icon icon={Icons.Language} className={styles.language} />
            <div className={styles['language-divider']} />

            {distinctLocales.map((locale, index) => (
              <React.Fragment key={locale}>
                <StyledLink
                  className={styles.language}
                  href={pathname}
                  locale={locale}
                >
                  {t('generic', 'locales', locale as keyof Locales)}
                </StyledLink>

                {index !== (distinctLocales.length - 1) && (
                  <div className={styles['language-divider']} />
                )}
              </React.Fragment>
            ))}
          </div>
        </hyphens.div>
      </Modal>
    );
  },
);
