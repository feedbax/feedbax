import { memo } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from '@/utils/i18n/hooks';

import type { GetStaticPaths, GetStaticProps } from 'next';

export default memo(
  function Event() {
    const router = useRouter();
    const { t } = useTranslation();

    if (router.isFallback) return <div>Loading..</div>;

    return (
      <pre>
        {JSON.stringify(router, null, 2)}
      </pre>
    );
  },
);

export const getStaticProps: GetStaticProps = (
  async () => ({
    props: {},
    revalidate: 1,
  })
);

export const getStaticPaths: GetStaticPaths = (
  async () => ({ paths: [], fallback: true })
);
