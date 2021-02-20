import Head from 'next/head';

import ModalProvider from '@/components/Modal/provider';
import ModalWrapper from '@/components/Modal/Wrapper/dynamic';
import Theme from '@/components/Theme';

import type { AppProps } from 'next/app';

import '@/utils/styles/globals.css';

export default (
  function FeedbaxApp(props: AppProps): JSX.Element {  
    const { Component, pageProps } = props;
  
    return (
      <>
        <Head>
          <meta data-locale={props.router.locale} />
        </Head>
  
        <Theme />
  
        <ModalProvider>
          <ModalWrapper />
  
          { /* eslint-disable-next-line react/jsx-props-no-spreading */ }
          <Component {...pageProps} />
        </ModalProvider>
      </>
    );
  }  
);
