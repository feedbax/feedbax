import Head from 'next/head';
import { memo } from 'react';
import { useTranslation } from '@/utils/i18n/hooks';

import getContent from '@/utils/i18n/locales/generic/__generated/loader-privacy-policy';
import hyphens from '@/components/Hyphens';

import styles from './page.module.scss';

export default memo(
  function PrivacyPolicy() {
    const { t, locale } = useTranslation();
    const Content = getContent[locale];

    return (
      <div className={styles.container}>
        <Head>
          <title>{t('pages', 'privacy-policy', 'title')}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <hyphens.div className={styles.content}>
          <Content />
        </hyphens.div>
      </div>
    );
  },
);
