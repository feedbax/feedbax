import { memo } from 'react';

import { injcetTranslation } from '@/i18n/injector';
import { useTranslation } from '@/i18n/hook';

import Head from 'next/head';
import CookieConsent from '@/components/CookieConsent/dynamic';

import { useFela } from 'react-fela';
import { rules } from '@/styles/pages';

import type { GetStaticProps } from 'next';

export default memo(
  function Home () {
    const { t } = useTranslation();
    const { css } = useFela();

    return (
      <div className={css(rules.container)}>
        <CookieConsent />

        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          {t('home', 'benefit_1')}
        </main>

        <footer>
          {t('home', 'benefit_6', 'content_1')}
        </footer>
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
