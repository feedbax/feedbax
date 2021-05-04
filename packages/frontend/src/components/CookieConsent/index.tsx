import React, { memo } from 'react';
import { useCallback, useEffect, useState } from 'react';

import cookies from 'js-cookie';

import { useTranslation } from '@/i18n/hooks';
import { useRouter } from 'next/router';

import Modal from '@/components/Modal/dynamic';
import hyphens from '@/components/Hyphens';
import StyledLink from '@/components/StyledLink';
import Icon, { Icons } from '@/components/Icon';

import Button from './components/Button';
import styles from './styles.module.scss';

function useUnmount(onUnmount: () => void) {
  useEffect(() => onUnmount, []);
}

function useScrollLock(lock: boolean) {
  useUnmount(() => {
    const html = document.querySelector<HTMLElement>('html');
    html?.classList.remove('disable-scroll');
  });

  useEffect(
    function showModalToggled() {
      const html = document.querySelector<HTMLElement>('html');

      if (lock) {
        html?.classList.add('disable-scroll');
      } else {
        html?.classList.remove('disable-scroll');
      }
    },

    [lock],
  );
}

function useModalVisibility(): [boolean, (show: boolean) => void] {
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const cookieConsentAccepted = cookies.get('consent-accepted');
    const hasConsetAccepted = typeof cookieConsentAccepted !== 'undefined';

    setShowModal(!hasConsetAccepted);
  }, []);

  return [showModal, setShowModal];
}

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
