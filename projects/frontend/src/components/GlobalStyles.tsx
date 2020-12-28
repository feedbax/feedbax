/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from 'react';

import { jsx, css, Global } from '@emotion/react';
import { cssVar } from '~lib/css-helper';

import type { Colors } from '~theme';

type Props = {
  color?: Colors;
};

const GlobalStyles = React.memo(
  ({ color = '--color-feedbax-primary' }: Props) => (
    <Global
      styles={
        css`
          html,
          body,
          #___gatsby {
            background-color: ${cssVar(color)};
          }
        `
      }
    />
  ),
);

export default GlobalStyles;
