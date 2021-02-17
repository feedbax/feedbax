import ModalProvider from '@/components/Modal/provider';
import ModalWrapper from '@/components/Modal/Wrapper/dynamic';
import Theme from '@/components/Theme';

import { TranslationProvider } from '@/utils/i18n/context';

import type { AppProps } from 'next/app';

import '@/utils/styles/globals.css';

function FeedbaxApp(props: AppProps): JSX.Element {
  const { Component, pageProps } = props;
  const { translation } = pageProps;

  return (
    <>
      <Theme />

      <TranslationProvider value={translation}>
        <ModalProvider>
          <ModalWrapper />

          { /* eslint-disable-next-line react/jsx-props-no-spreading */ }
          <Component {...pageProps} />
        </ModalProvider>
      </TranslationProvider>
    </>
  );
}

export default FeedbaxApp;
