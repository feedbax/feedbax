import ModalProvider from '@/components/Modal/provider';
import ModalWrapper from '@/components/Modal/Wrapper/dynamic';

import LazyFontLoader from '@/components/LazyFontLoader';
import ViewportFix from '@/components/ViewportFix';

import TranslationLoader from '@/utils/i18n/loader';

import type { AppProps } from 'next/app';

import '@/styles/theme/fonts.scss';
import '@/styles/theme/colors.scss';
import '@/styles/globals.scss';

export default (
  function FeedbaxApp(props: AppProps): JSX.Element {
    const { Component, pageProps, router } = props;
    const { locale } = router;

    return (
      <TranslationLoader locale={locale}>
        <LazyFontLoader />
        <ViewportFix />

        <ModalProvider>
          <ModalWrapper />

          { /* eslint-disable-next-line react/jsx-props-no-spreading */ }
          <Component {...pageProps} />
        </ModalProvider>
      </TranslationLoader>
    );
  }
);
