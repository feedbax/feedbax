import { memo } from 'react';
import { useEffect, useState } from 'react';

import Head from 'next/head';

import { Global } from '@emotion/react';
import { themeStyles } from '@/utils/theme';
import { normalize } from 'polished';

export default memo(
  function Theme(): JSX.Element {
    const [hydrated, setHydrated] = useState(false);

    useEffect(
      function mounted() {
        setHydrated(true);
      },

      [],
    );

    return (
      <>
        <Global styles={themeStyles} />
        <Global styles={normalize()} />

        <Head>
          <link rel="preload" as="style" href="/assets/fonts/fonts.css" />
          <link rel="stylesheet" href="/assets/fonts/fonts.css" media={hydrated ? 'all' : 'print'} />
        </Head>
      </>
    );
  },
);
