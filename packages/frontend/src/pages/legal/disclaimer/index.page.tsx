import { memo } from 'react';
import { useTranslation } from '@/lib/i18n/hooks';

import Head from 'next/head';

import hyphens from '@/components/Hyphens';
import StyledLink from '@/components/StyledLink';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';

import slugify from 'slugify';
import licenses from '@licenses';

import legalStyles from '@/pages/legal/page.module.scss';
import styles from './page.module.scss';

export default memo(
  function Disclaimer() {
    const { t } = useTranslation();

    return (
      <div className={legalStyles.container}>
        <Head>
          <title>{t('pages', 'disclaimer', 'title')}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Logo
          href="/legal/privacy-policy"
          className={legalStyles.logo}
        />

        <div className={styles.content}>
          <hyphens.p>
            {t('pages', 'disclaimer', 'text')}
          </hyphens.p>

          {licenses.map((license) => {
            const licenseId = `${license.name}-${license.version}`;
            const licenseLink = slugify(licenseId);

            return (
              <StyledLink
                className={styles['license-link']}
                href={`/legal/license/${licenseLink}`}
                key={licenseId}
              >
                {`${license.name}@${license.version} | (${license.license})`}
              </StyledLink>
            );
          })}
        </div>

        <Footer />
      </div>
    );
  },
);
