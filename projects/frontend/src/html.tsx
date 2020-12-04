/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { jsx, css, Global } from "@emotion/react";

import KlinicSlabBold_woff2 from "~assets/fonts/KlinicSlab-Bold.woff2";
import KlinicSlabBold_woff from "~assets/fonts/KlinicSlab-Bold.woff";

import KlinicSlabBook_woff2 from "~assets/fonts/KlinicSlab-Book.woff2";
import KlinicSlabBook_woff from "~assets/fonts/KlinicSlab-Book.woff";

import KlinicSlabBookItalic_woff2 from "~assets/fonts/KlinicSlab-BookItalic.woff2";
import KlinicSlabBookItalic_woff from "~assets/fonts/KlinicSlab-BookItalic.woff";

import RobotoSlabBold_woff2 from "~assets/fonts/RobotoSlab-Bold.woff2";
import RobotoSlabBold_woff from "~assets/fonts/RobotoSlab-Bold.woff";

import RobotoSlabRegular_woff2 from "~assets/fonts/RobotoSlab-Regular.woff2";
import RobotoSlabRegular_woff from "~assets/fonts/RobotoSlab-Regular.woff";

import "normalize.css";

const fixVhUnit = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

export default function HTML(props: Props) {
  useEffect(() => {
    window.addEventListener("resize", fixVhUnit);
    fixVhUnit();

    return () => {
      window.removeEventListener("resize", fixVhUnit);
    };
  }, []);

  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />

        { /* prettier-ignore */ }
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, shrink-to-fit=no" />

        { /* prettier-ignore */ }
        <link rel="preload" href={KlinicSlabBold_woff2} as="font" type="font/woff2" crossOrigin="anonymous" />
        { /* prettier-ignore */ }
        <link rel="preload" href={KlinicSlabBold_woff} as="font" type="font/woff" crossOrigin="anonymous" />

        { /* prettier-ignore */ }
        <link rel="preload" href={KlinicSlabBook_woff2} as="font" type="font/woff2" crossOrigin="anonymous" />
        { /* prettier-ignore */ }
        <link rel="preload" href={KlinicSlabBook_woff} as="font" type="font/woff" crossOrigin="anonymous" />

        { /* prettier-ignore */ }
        <link rel="preload" href={KlinicSlabBookItalic_woff2} as="font" type="font/woff2" crossOrigin="anonymous" />
        { /* prettier-ignore */ }
        <link rel="preload" href={KlinicSlabBookItalic_woff} as="font" type="font/woff" crossOrigin="anonymous" />

        { /* prettier-ignore */ }
        <link rel="preload" href={RobotoSlabBold_woff2} as="font" type="font/woff2" crossOrigin="anonymous" />
        { /* prettier-ignore */ }
        <link rel="preload" href={RobotoSlabBold_woff} as="font" type="font/woff" crossOrigin="anonymous" />

        { /* prettier-ignore */ }
        <link rel="preload" href={RobotoSlabRegular_woff2} as="font" type="font/woff2" crossOrigin="anonymous" />
        { /* prettier-ignore */ }
        <link rel="preload" href={RobotoSlabRegular_woff} as="font" type="font/woff" crossOrigin="anonymous" />

        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}

        { /* prettier-ignore */ }
        <div key={`body`} id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
        <Global styles={stylesGlobal} />

        {props.postBodyComponents}
      </body>
    </html>
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

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};

const stylesGlobal = css`
  html,
  body,
  #___gatsby {
    position: relative;
    margin: 0;
    width: 100%;
    min-height: 100vh;
    min-height: calc(var(--vh, 1vh) * 100);
    touch-action: pan-y;
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
  }

  @font-face {
    font-family: "Klinic Slab";

    // prettier-ignore
    src:  local("Georgia"),
          url(${KlinicSlabBold_woff2}) format("woff2"),
          url(${KlinicSlabBold_woff}) format("woff");

    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Klinic Slab Book";

    // prettier-ignore
    src:  local("Georgia"),
          url(${KlinicSlabBook_woff2}) format("woff2"),
          url(${KlinicSlabBook_woff}) format("woff");

    font-display: swap;
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "Klinic Slab Book";

    // prettier-ignore
    src:  local("Georgia"),
          url(${KlinicSlabBookItalic_woff2}) format("woff2"),
          url(${KlinicSlabBookItalic_woff}) format("woff");

    font-display: swap;
    font-weight: normal;
    font-style: italic;
  }

  @font-face {
    font-family: "Roboto Slab";

    // prettier-ignore
    src:  local("Georgia"),
          url(${RobotoSlabBold_woff2}) format("woff2"),
          url(${RobotoSlabBold_woff}) format("woff");

    font-display: swap;
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: "Roboto Slab";

    // prettier-ignore
    src:  local("Georgia"),
          url(${RobotoSlabRegular_woff2}) format("woff2"),
          url(${RobotoSlabRegular_woff}) format("woff");

    font-display: swap;
    font-weight: normal;
    font-style: normal;
  }
`;
