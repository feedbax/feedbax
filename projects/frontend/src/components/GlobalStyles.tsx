/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from 'react';

import { jsx, css, Global } from '@emotion/react';
import { colors } from '~theme';

type Props = {
  color?: keyof typeof colors;
};

const GlobalStyles = React.memo(
  ({ color = 'first' }: Props) => (
    <Global
      styles={
        css`
          html,
          body,
          #___gatsby {
            background-color: ${colors[color]};
          }
        `
      }
    />
  ),
);

export default GlobalStyles;
