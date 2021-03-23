import ModalProvider from '@/components/Modal/provider';
import ModalWrapper from '@/components/Modal/Wrapper/dynamic';
import Theme from '@/components/Theme';
import TranslationLoader from '@/utils/i18n/loader';

import type { AppProps } from 'next/app';

import '@/utils/styles/globals.css';

export default (
  function FeedbaxApp(props: AppProps): JSX.Element {
    const { Component, pageProps, router } = props;
    const { locale } = router;

    return (
      <TranslationLoader locale={locale}>
        <Theme />

        <ModalProvider>
          <ModalWrapper />

          { /* eslint-disable-next-line react/jsx-props-no-spreading */ }
          <Component {...pageProps} />
        </ModalProvider>
      </TranslationLoader>
    );
  }
);
