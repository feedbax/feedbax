import Head from 'next/head';

import { memo } from 'react';
import { useTranslation } from '@/lib/i18n/hooks';

import getContent from '@/lib/i18n/locales/generic/__generated/loader-privacy-policy';

import hyphens from '@/components/Hyphens';
import Footer from '@/components/Footer';
import Logo from '@/components/Logo';

import legalStyles from '@/pages/legal/page.module.scss';
import styles from './page.module.scss';

export default memo(
  function PrivacyPolicy() {
    const { t, locale } = useTranslation();
    const Content = getContent[locale];

    return (
      <div className={legalStyles.container}>
        <Head>
          <title>{t('pages', 'privacy-policy', 'title')}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Logo className={legalStyles.logo} />

        <hyphens.div className={styles.content}>
          <Content />
        </hyphens.div>

        <Footer />
      </div>
    );
  },
);
