import React from "react";
import PropTypes from "prop-types";

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

export default function HTML(props) {
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

        {props.postBodyComponents}
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
