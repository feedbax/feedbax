import { memo } from 'react';
import { useRouter } from 'next/router';

import { withI18n } from '@/utils/i18n/loader';
import { useTranslation } from '@/utils/i18n/hook';

import type { GetStaticPaths, GetStaticProps } from 'next';

export default memo(
  function Event() {
    const router = useRouter();
    const { t } = useTranslation();

    if (router.isFallback) return <div>Loading..</div>;

    return (
      <div>
        {t('generic', 'locales', 'de')}
      </div>
    );
  },
);

export const getStaticProps: GetStaticProps = withI18n(
  async (context) => ({
    props: context,
    revalidate: 1,
  }),
);

export const getStaticPaths: GetStaticPaths = (
  async () => ({ paths: [], fallback: true })
);
