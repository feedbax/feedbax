import Head from 'next/head';
import { memo } from 'react';

import { useTranslation } from '@/utils/i18n/hook';
import { withI18n } from '@/utils/i18n/loader';

import CookieConsent from '@/components/CookieConsent/dynamic';
import Logo from '@/components/Logo';

import Background from './components/Background';
import Title from './components/Title';
import Login from './components/Login';

import * as styles from './styles';

import type { GetStaticProps } from 'next';

export default memo(
  function Home() {
    const { t } = useTranslation();

    return (
      <div css={styles.container}>
        <CookieConsent />

        <Head>
          <title>{t('pages', 'home')}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Background />

        <div css={styles.main}>
          <Logo />
          <Title>feedb.ax</Title>

          <Login>
            lol
          </Login>
        </div>

        {Array.from({ length: 250 }, () => (
          <div key={Math.random()}>hi</div>
        ))}
      </div>
    );
  },
);

export const getStaticProps: GetStaticProps = withI18n(
  async (context) => ({ props: context }),
);
