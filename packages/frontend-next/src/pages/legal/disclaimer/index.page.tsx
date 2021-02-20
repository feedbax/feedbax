import Head from 'next/head';
import { memo } from 'react';
import { useTranslation } from '@/utils/i18n/hook';

import * as styles from '@/pages/legal/privacy-policy/index.styles';

export default memo(
  function Disclaimer() {
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
