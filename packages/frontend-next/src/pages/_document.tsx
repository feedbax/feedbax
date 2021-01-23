import Document from 'next/document';

import { DocumentContext, DocumentInitialProps } from 'next/document';
import { Html, Head } from 'next/document';
import { Main, NextScript } from 'next/document';

import { renderToNodeList } from 'react-fela';
import { renderer } from '@/theme';

export default class FeedbaxDocument extends Document {
  static async getInitialProps (ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    const felaStyles = renderToNodeList(renderer);

    if (Array.isArray(initialProps.styles)) {
      initialProps.styles = [
        ...initialProps.styles,
        ...felaStyles,
      ];
    }

    return initialProps;
  }

  render (): JSX.Element {
    return (
      <Html current-theme="default">
        <Head />

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
