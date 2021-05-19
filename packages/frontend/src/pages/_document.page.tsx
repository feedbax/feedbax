import Document from 'next/document';
import { Html, Head } from 'next/document';
import { Main, NextScript } from 'next/document';

import I18nServer from '@/lib/i18n/server';

import type { DocumentContext } from 'next/document';

export default (
  class FeedbaxDocument extends Document<{ translation: unknown }> {
    static async getInitialProps(context: DocumentContext) {
      const translation = I18nServer.extractTranslation(context.renderPage);
      const initialProps = await Document.getInitialProps(context);

      return { ...initialProps, translation };
    }

    render() {
      return (
        <Html>
          <Head />

          <body>
            <Main />
            <div id="__modal" />

            <script
              id="__I18N_DATA__"

              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: [
                  'window.translationHydrated = false;',
                  `window.translation = ${this.props.translation};`,
                ].join('\n'),
              }}
            />

            <NextScript />
          </body>
        </Html>
      );
    }
  }
);
