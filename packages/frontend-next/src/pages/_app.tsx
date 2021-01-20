import { memo } from 'react';

import { RendererProvider } from 'react-fela';
import { renderer } from '@/theme';

import 'focus-visible';
import '@/styles/globals.css';

import type { AppProps } from 'next/app';

export default memo(
  function FeedbaxApp ({ Component, pageProps }: AppProps) {
    return (
      <RendererProvider renderer={renderer}>
        { /* eslint-disable-next-line react/jsx-props-no-spreading */ }
        <Component {...pageProps} />
      </RendererProvider>
    );
  },
);
