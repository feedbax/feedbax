/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React, { useEffect } from 'react';

import { jsx, css, Global } from '@emotion/react';
import { colors } from '~theme';

type Props = {
  color?: keyof typeof colors;
};

const fixVhUnit = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

const GlobalStyles = React.memo(
  ({ color = 'first' }: Props) => {
    useEffect(() => {
      fixVhUnit();
      window.addEventListener('resize', fixVhUnit);

      return () => {
        window.removeEventListener('resize', fixVhUnit);
      };
    }, []);

    return (
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
    );
  },
);

export default GlobalStyles;
