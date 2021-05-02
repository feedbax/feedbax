import Head from 'next/head';

import { memo, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from '@/utils/i18n/hooks';

import CookieConsent from '@/components/CookieConsent/dynamic';
import Logo from '@/components/Logo';

import Background from './components/Background';
import Title from './components/Title';
import Login, { Input, Button } from './components/Login';
import YourTool from './components/YourTool';
import SeeMore from './components/SeeMore';
import Benefits, { Benefit } from './components/Benefits';

import styles from './page.module.scss';

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
      <div className={styles.container}>
        <CookieConsent />

        <Head>
          <link rel="icon" href="/favicon.ico" />

          <title>{t('pages', 'home', 'title')}</title>
          <meta name="description" content={t('pages', 'home', 'description')} />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://feedb.ax" />
          <meta property="og:title" content={t('pages', 'home', 'title')} />
          <meta property="og:description" content={t('pages', 'home', 'description')} />
          <meta property="og:image" content="https://cdn.sstatic.net/Sites/webapps/Img/apple-touch-icon@2.png?v=f700edad5c7b" />
        </Head>

        <Background />

        <div className={styles.main}>
          <Logo className={styles['logo-size']} />

          <div className={styles['main-group']}>
            <Title>feedb.ax</Title>

            <Login className={styles['main-group-login-form']}>
              <Input
                placeholder="Event-Code"
                value={eventCode}
                setValue={setEventCodeClean}
              />

              <Button disabled={eventCode.length === 0} onClick={handleEventLogin}>
                {t('pages', 'home', 'lets-go')}
              </Button>
            </Login>

            <SeeMore className={styles['main-group-see-more']}>
              {t('pages', 'home', 'see-more')}
            </SeeMore>
          </div>
        </div>

        <div className={styles['your-tool-group']}>
          <YourTool>{t('pages', 'home', 'your-tool')}</YourTool>
        </div>

        <div className={styles['benefits-group']}>
          <Benefits>
            <Benefit
              src="/assets/images/benefit-1.png"
              width={1228}
              height={663}
            >
              {t('pages', 'home', 'benefit-1')}
            </Benefit>

            <Benefit src="/assets/images/benefit-2.png" width={750} height={713}>
              {t('pages', 'home', 'benefit-2')}
            </Benefit>

            <Benefit src="/assets/images/benefit-3.png" width={945} height={641}>
              {t('pages', 'home', 'benefit-3')}
            </Benefit>

            <Benefit src="/assets/images/benefit-4.png" width={895} height={763}>
              {t('pages', 'home', 'benefit-4', 'title')}

              <small>
                <ul>
                  <li>{t('pages', 'home', 'benefit-4', 'content-1')}</li>
                  <li>{t('pages', 'home', 'benefit-4', 'content-2')}</li>
                </ul>
              </small>
            </Benefit>

            <Benefit src="/assets/images/benefit-5.png" width={1019} height={601}>
              {t('pages', 'home', 'benefit-5', 'title')}
              <small>{t('pages', 'home', 'benefit-5', 'content-1')}</small>
              <small>{t('pages', 'home', 'benefit-5', 'content-2')}</small>
            </Benefit>

            <Benefit src="/assets/images/benefit-6.png" width={1151} height={990}>
              {t('pages', 'home', 'benefit-6', 'title')}
              <small>{t('pages', 'home', 'benefit-6', 'content-1')}</small>
            </Benefit>
          </Benefits>
        </div>
      </div>
    );
  },
);
