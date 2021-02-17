import Head from 'next/head';
import { memo } from 'react';

import { useTranslation } from '@/utils/i18n/hook';
import { withI18n } from '@/utils/i18n/loader';

import getContent from '@/utils/i18n/locales/generic/__generated/loader-privacy-policy';
import hyphens from '@/components/Hyphens';

import * as styles from './index.styles';

import type { GetStaticProps } from 'next';

type PrivacyPolicyProps = { locale: string };

export default memo(
  function PrivacyPolicy({ locale }: PrivacyPolicyProps) {
    const { t } = useTranslation();
    const Content = getContent[locale];

    return (
      <div css={styles.container}>
        <Head>
          <title>{t('pages', 'privacy-policy')}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <hyphens.div ccss={styles.content}>
          <Content />
        </hyphens.div>
      </div>
    );
  },
);

export const getStaticProps: GetStaticProps = withI18n(
  async (context) => ({ props: context }),
);
