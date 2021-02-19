import Head from 'next/head';

import { memo, useState } from 'react';
import { useRouter } from 'next/router';

import { useTranslation } from '@/utils/i18n/hook';
import { withI18n } from '@/utils/i18n/loader';

import CookieConsent from '@/components/CookieConsent/dynamic';
import Logo from '@/components/Logo';
import hyphens from '@/components/Hyphens';

import Background from './components/Background';
import Title from './components/Title';
import Login, { Input, Button } from './components/Login';
import YourTool from './components/YourTool';
import SeeMore from './components/SeeMore';
import Benefits, { Benefit } from './components/Benefits';

import * as styles from './styles';

import type { GetStaticProps } from 'next';

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
          <Benefits>
            <Benefit src="/assets/images/benefit-1.png" width={1228} height={663}>
              {t('home', 'benefit-1')}
            </Benefit>

            <Benefit src="/assets/images/benefit-2.png" width={750} height={713}>
              {t('home', 'benefit-2')}
            </Benefit>

            <Benefit src="/assets/images/benefit-3.png" width={945} height={641}>
              {t('home', 'benefit-3')}
            </Benefit>

            <Benefit src="/assets/images/benefit-4.png" width={895} height={763}>
              {t('home', 'benefit-4', 'title')}

              <hyphens.small>
                <ul>
                  <li>{t('home', 'benefit-4', 'content-1')}</li>
                  <li>{t('home', 'benefit-4', 'content-2')}</li>
                </ul>
              </hyphens.small>
            </Benefit>

            <Benefit src="/assets/images/benefit-5.png" width={1019} height={601}>
              {t('home', 'benefit-5', 'title')}
              <hyphens.small>{t('home', 'benefit-5', 'content-1')}</hyphens.small>
              <code>{t('home', 'benefit-5', 'content-2')}</code>
            </Benefit>

            <Benefit src="/assets/images/benefit-6.png" width={1151} height={990}>
              {t('home', 'benefit-6', 'title')}
              <hyphens.small>{t('home', 'benefit-6', 'content-1')}</hyphens.small>
            </Benefit>
          </Benefits>
        </div>
      </div>
    );
  },
);

export const getStaticProps: GetStaticProps = withI18n(
  async (context) => ({ props: context }),
);
