import { memo } from 'react';

import { injcetTranslation } from '@/i18n/injector';
import { useTranslation } from '@/i18n/hook';

import Head from 'next/head';
import hyphens from '@/components/Hyphens';

import getContent from '@/i18n/locales/generic/__generated/loader-privacy-policy';

import { useFela } from 'react-fela';
import { rules } from '@/styles/pages/legal/privacy-policy';

import type { GetStaticProps } from 'next';

export default memo(
  function PrivacyPolicy ({ locale }: PrivacyPolicyProps) {
    const { t } = useTranslation();
    const { css } = useFela();

    const Content = getContent[locale];

    return (
      <div className={css(rules.container)}>
        <Head>
          <title>{t('pages', 'privacy-policy')}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <hyphens.div customRule={rules.content}>
          <Content />
        </hyphens.div>
      </div>
    );
  },
);

export const getStaticProps: GetStaticProps = (
  async (_props) => {
    const props = await injcetTranslation(_props);
    return { props };
  }
);

type PrivacyPolicyProps = { locale: string };
