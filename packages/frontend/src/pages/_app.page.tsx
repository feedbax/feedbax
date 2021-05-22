// import ModalProvider from '@/components/Modal/provider';
// import ModalWrapper from '@/components/Modal/Wrapper/dynamic';

import LazyFontLoader from '@/components/Utils/LazyFontLoader';
import ViewportFix from '@/components/Utils/ViewportFix';

import TranslationLoader from '@/lib/i18n/loader';

import type { AppProps } from 'next/app';

import '@/styles/theme/fonts/fonts.scss';
import '@/styles/theme/colors/colors.scss';
import '@/styles/globals.scss';
import 'normalize.css';

export default (
  function FeedbaxApp(props: AppProps): JSX.Element {
    const { Component, pageProps, router } = props;
    const { locale } = router;

    return (
      <TranslationLoader locale={locale}>
        <LazyFontLoader />
        <ViewportFix />

        {/* <ModalProvider>
          <ModalWrapper /> */}

        { /* eslint-disable-next-line react/jsx-props-no-spreading */ }
        <Component {...pageProps} />

        {/* </ModalProvider> */}
      </TranslationLoader>
    );
  }
);
