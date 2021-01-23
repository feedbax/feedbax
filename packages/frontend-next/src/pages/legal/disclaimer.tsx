import { memo } from 'react';

import { injcetTranslation } from '@/i18n/injector';
import { useTranslation } from '@/i18n/hook';

import Head from 'next/head';

import { useFela } from 'react-fela';
import { rules } from '@/styles/pages/legal/privacy-policy';

import type { GetStaticProps } from 'next';

export default memo(
  function PrivacyPolicy ({ licenses }: DisclaimerProps) {
    const { t } = useTranslation();
    const { css } = useFela();

    const [firstLicense] = licenses;
    console.log('firstLicense', JSON.stringify(firstLicense, null, 2));

    return (
      <div className={css(rules.container)}>
        <Head>
          <title>{t('pages', 'disclaimer')}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
    );
  },
);

export const getStaticProps: GetStaticProps = (
  async (_props) => {
    const props = await injcetTranslation(_props);
    const { default: licenses } = await import('@licenses');

    return { props: { ...props, licenses } };
  }
);

type DisclaimerProps = { licenses: typeof import('@licenses') };
