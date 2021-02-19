import Head from 'next/head';

import { memo, useState } from 'react';
import { useRouter } from 'next/router';

import { useTranslation } from '@/utils/i18n/hook';
import { withI18n } from '@/utils/i18n/loader';

import CookieConsent from '@/components/CookieConsent/dynamic';
import Logo from '@/components/Logo';

import Background from './components/Background';
import Title from './components/Title';
import Login, { Input, Button } from './components/Login';
import YourTool from './components/YourTool';

import * as styles from './styles';

import type { GetStaticProps } from 'next';
import SeeMore from './components/SeeMore';

export default memo(
  function Home() {
    const { t } = useTranslation();
    const router = useRouter();

    const [eventCode, setEventCode] = useState('');

    const setEventCodeClean = (
      (code: string) => setEventCode(
        code
          .trim()
          .toLocaleLowerCase(),
      )
    );

    const handleEventLogin = () => (
      eventCode !== ''
      && router.push(`/@/${eventCode}`)
    );

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

          <div css={styles.mainGroup}>
            <Title>feedb.ax</Title>

            <Login>
              <Input
                placeholder="Event-Code"
                value={eventCode}
                setValue={setEventCodeClean}
              />

              <Button onClick={handleEventLogin}>
                {t('home', 'lets-go')}
              </Button>
            </Login>

            <SeeMore>
              {t('home', 'see-more')}
            </SeeMore>
          </div>
        </div>

        <div css={styles.yourToolGroup}>
          <YourTool>{t('home', 'your-tool')}</YourTool>
        </div>

        <div css={styles.benefitsGroup}>
          <YourTool>{t('home', 'your-tool')}</YourTool>
        </div>

        {Array.from({ length: 250 }, (_, key) => (
          <div key={key} data-key={key}>hi</div>
        ))}
      </div>
    );
  },
);

export const getStaticProps: GetStaticProps = withI18n(
  async (context) => ({ props: context }),
);
