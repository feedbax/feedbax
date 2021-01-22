import { memo } from 'react';

import { provideTranslation } from '@/i18n/provide-translation';
import { injectTranslation } from '@/i18n/inject-translation';
import { useTranslation } from '@/i18n/hook';

import Head from 'next/head';

import { useFela } from 'react-fela';
import { rules } from '@/styles/pages/index';

import type { GetStaticProps } from 'next';

export default memo(
  provideTranslation(
    function Home () {
      const { t } = useTranslation();
      const { css } = useFela();

      return (
        <div className={css(rules.container)}>
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
  ),
);

export const getStaticProps: GetStaticProps = (
  injectTranslation(
    async (props) => ({ props }),
  )
);
