/** @jsx jsx */

import { jsx, css, Global } from '@emotion/react';
import { normalize } from 'polished';
import { themes } from '~theme';

import KlinicSlabBoldWoff2 from '~assets/fonts/KlinicSlab-Bold.woff2';
import KlinicSlabBoldWoff from '~assets/fonts/KlinicSlab-Bold.woff';

import KlinicSlabBookWoff2 from '~assets/fonts/KlinicSlab-Book.woff2';
import KlinicSlabBookWoff from '~assets/fonts/KlinicSlab-Book.woff';

import KlinicSlabBookItalicWoff2 from '~assets/fonts/KlinicSlab-BookItalic.woff2';
import KlinicSlabBookItalicWoff from '~assets/fonts/KlinicSlab-BookItalic.woff';

import RobotoSlabBoldWoff2 from '~assets/fonts/RobotoSlab-Bold.woff2';
import RobotoSlabBoldWoff from '~assets/fonts/RobotoSlab-Bold.woff';

import RobotoSlabRegularWoff2 from '~assets/fonts/RobotoSlab-Regular.woff2';
import RobotoSlabRegularWoff from '~assets/fonts/RobotoSlab-Regular.woff';

export default function HTML (props: Props): JSX.Element {
  const { htmlAttributes, bodyAttributes } = props;
  const { headComponents, preBodyComponents, postBodyComponents } = props;
  const { body } = props;

  return (
    /* eslint-disable react/jsx-props-no-spreading */
    /* eslint-disable react/no-danger */
    // eslint-disable-next-line jsx-a11y/html-has-lang
    <html {...htmlAttributes} className="theme-default">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />

        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, shrink-to-fit=no" />

        <link rel="preload" href={KlinicSlabBoldWoff2} as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href={KlinicSlabBoldWoff} as="font" type="font/woff" crossOrigin="anonymous" />

        <link rel="preload" href={KlinicSlabBookWoff2} as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href={KlinicSlabBookWoff} as="font" type="font/woff" crossOrigin="anonymous" />

        <link rel="preload" href={KlinicSlabBookItalicWoff2} as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href={KlinicSlabBookItalicWoff} as="font" type="font/woff" crossOrigin="anonymous" />

        <link rel="preload" href={RobotoSlabBoldWoff2} as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href={RobotoSlabBoldWoff} as="font" type="font/woff" crossOrigin="anonymous" />

        <link rel="preload" href={RobotoSlabRegularWoff2} as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href={RobotoSlabRegularWoff} as="font" type="font/woff" crossOrigin="anonymous" />

        {headComponents}
      </head>
      <body {...bodyAttributes}>
        <Global styles={stylesGlobal} />

        {preBodyComponents}

        <div
          key="body"
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: body }}
        />

        {postBodyComponents}
      </body>
    </html>
    /* eslint-enable react/jsx-props-no-spreading */
    /* eslint-enable react/no-danger */
  );
}

type Props = {
  htmlAttributes: Record<string, unknown>;
  headComponents: Array<unknown>;
  bodyAttributes: Record<string, unknown>;
  preBodyComponents: Array<unknown>;
  body: string;
  postBodyComponents: Array<unknown>;
};

/* eslint-disable @typescript-eslint/indent */
const stylesGlobal = css`
  ${normalize()}
  ${themes}

  html,
  body,
  #___gatsby {
    position: relative;
    margin: 0;

    width: 100%;

    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);

    touch-action: pan-y;
    font-size: 100%;
    hyphens: none;
  }

  img.emoji {
    height: 1em;
    width: 1em;
    margin: 0 0.05em 0 0.1em;
    vertical-align: -0.1em;
  }

  * {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-overflow-scrolling: touch;

    &:focus {
      outline: #ffda73 auto 2px;
      outline-offset: 8px;
    }

    &:focus:not(.focus-visible) {
      outline: none;
    }
  }

  @font-face {
    font-family: "Klinic Slab";

    src:  local("Georgia"),
          url(${KlinicSlabBoldWoff2}) format("woff2"),
          url(${KlinicSlabBoldWoff}) format("woff");

    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Klinic Slab Book";

    src:  local("Georgia"),
          url(${KlinicSlabBookWoff2}) format("woff2"),
          url(${KlinicSlabBookWoff}) format("woff");

    font-display: swap;
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "Klinic Slab Book";

    src:  local("Georgia"),
          url(${KlinicSlabBookItalicWoff2}) format("woff2"),
          url(${KlinicSlabBookItalicWoff}) format("woff");

    font-display: swap;
    font-weight: normal;
    font-style: italic;
  }

  @font-face {
    font-family: "Roboto Slab";

    src:  local("Georgia"),
          url(${RobotoSlabBoldWoff2}) format("woff2"),
          url(${RobotoSlabBoldWoff}) format("woff");

    font-display: swap;
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: "Roboto Slab";

    src:  local("Georgia"),
          url(${RobotoSlabRegularWoff2}) format("woff2"),
          url(${RobotoSlabRegularWoff}) format("woff");

    font-display: swap;
    font-weight: normal;
    font-style: normal;
  }
`;
