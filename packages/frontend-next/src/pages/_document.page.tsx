import Document from 'next/document';
import { Html, Head } from 'next/document';
import { Main, NextScript } from 'next/document';

import fs from 'fs';
import path from 'path';

import type { DocumentContext } from 'next/document';

export default (
  class FeedbaxDocument extends Document<{ translation: unknown }> {
    static async getInitialProps(context: DocumentContext) {
      const initialProps = await Document.getInitialProps(context);

      const findLocale = (el: JSX.Element | null) => 'data-locale' in el?.props;
      const currentLocaleElement = initialProps.head?.find(findLocale);
      const currentLocale = currentLocaleElement?.props['data-locale'];

      const translationDir = path.resolve(process.cwd(), 'src/utils/i18n/locales', currentLocale);
      const translationPath = path.join(translationDir, '__generated/translation.json');
      const translationData = fs.readFileSync(translationPath, 'utf-8');

      const translation = JSON.parse(translationData);

      return { ...initialProps, translation };
    }

    render() {
      return (
        <Html>
          <Head />

          <body>
            <Main />
            <NextScript />

            <script
              id="__I18N_DATA__"

              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: [
                  'window.translationHydrated = false;',
                  `window.translation = ${JSON.stringify(this.props.translation)};`,
                ].join('\n'),
              }}
            />
          </body>
        </Html>
      );
    }
  }
);
