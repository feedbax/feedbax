/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from 'react';

import { jsx, css, Global } from '@emotion/react';
import { cssVar } from '~lib/css-helper';

import type { ColorKeys } from '~themes/types';

type Props = {
  color?: ColorKeys;
};

const GlobalStyles = React.memo(
  ({ color = '--color-feedbax-primary' }: Props) => (
    <Global
      styles={
        css`
          html, body, #___gatsby {
            background-color: ${cssVar(color)};
          }
        `
      }
    />
  ),
);

export default GlobalStyles;
