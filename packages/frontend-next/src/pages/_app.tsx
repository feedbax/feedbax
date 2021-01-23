import { memo } from 'react';

import { RendererProvider } from 'react-fela';
import { renderer } from '@/theme';

import ModalProvider from '@/components/Modal/provider';
import ModalWrapper from '@/components/Modal/Wrapper/dynamic';
import { TranslationProvider } from '@/i18n/context';

import 'focus-visible';
import '@/styles/globals.css';

import type { AppProps } from 'next/app';

export default memo(
  function FeedbaxApp (props: AppProps): JSX.Element {
    const { Component, pageProps } = props;
    const { translation } = pageProps;

    return (
      <RendererProvider renderer={renderer}>
        <TranslationProvider value={translation}>
          <ModalProvider>
            <ModalWrapper />

            { /* eslint-disable-next-line react/jsx-props-no-spreading */ }
            <Component {...pageProps} />
          </ModalProvider>
        </TranslationProvider>
      </RendererProvider>
    );
  },
);
