import Head from 'next/head';
import { memo } from 'react';

import { useTranslation } from '@/utils/i18n/hook';
import { withI18n } from '@/utils/i18n/loader';

import * as styles from '@/pages/legal/privacy-policy/index.styles';

import type { GetStaticProps } from 'next';

type DisclaimerProps = { licenses: typeof import('@licenses') };

export default memo(
  function PrivacyPolicy({ licenses: _ }: DisclaimerProps) {
    const { t } = useTranslation();

    // const [firstLicense] = licenses;
    // console.log('firstLicense', JSON.stringify(firstLicense, null, 2));

    return (
      <div css={styles.container}>
        <Head>
          <title>{t('pages', 'disclaimer')}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
    );
  },
);

export const getStaticProps: GetStaticProps = withI18n(
  async (context) => ({ props: context }),
);
