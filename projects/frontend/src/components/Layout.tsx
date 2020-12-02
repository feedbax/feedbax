/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from "react";

import { jsx, css, Global } from "@emotion/react";
import { colors } from "~theme";

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
import { useEffect } from "react";

type Props = {
  color?: keyof typeof colors;
  children: React.ReactNode;
};

const fixVhUnit = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

export default function Layout({ children, color = "first" }: Props) {
  useEffect(() => {
    window.addEventListener("resize", fixVhUnit);
    fixVhUnit();

    return () => {
      window.removeEventListener("resize", fixVhUnit);
    };
  }, []);

  return (
    <>
      <Global
        styles={[
          stylesGlobal,
          css`
            html,
            body,
            #___gatsby {
              background-color: ${colors[color]};
            }
          `,
        ]}
      />

      {children}
    </>
  );
}

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
    src: url(${KlinicSlabBold_woff2}) format("woff2"),
      url(${KlinicSlabBold_woff}) format("woff");
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: "Klinic Slab Book";
    src: url(${KlinicSlabBook_woff2}) format("woff2"),
      url(${KlinicSlabBook_woff}) format("woff");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "Klinic Slab Book";
    src: url(${KlinicSlabBookItalic_woff2}) format("woff2"),
      url(${KlinicSlabBookItalic_woff}) format("woff");
    font-weight: normal;
    font-style: italic;
  }

  @font-face {
    font-family: "Roboto Slab";
    src: url(${RobotoSlabBold_woff2}) format("woff2"),
      url(${RobotoSlabBold_woff}) format("woff");
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: "Roboto Slab";
    src: url(${RobotoSlabRegular_woff2}) format("woff2"),
      url(${RobotoSlabRegular_woff}) format("woff");
    font-weight: normal;
    font-style: normal;
  }
`;
