/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from "react";

import { jsx, css, Global } from "@emotion/react";
import { colors } from "~theme";

type Props = {
  color?: keyof typeof colors;
};

export default function GlobalStyles({ color = "first" }: Props): JSX.Element {
  return (
    <Global
      styles={css`
        html,
        body,
        #___gatsby {
          background-color: ${colors[color]};
        }
      `}
    />
  );
}
