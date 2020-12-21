import { css } from '@emotion/react';
import { fluidRange } from '~lib/css-helper';

import type { SerializedStyles } from '@emotion/react';
import type { Variant } from './types';

export const stylesText = css`
  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      ['4.6875rem', '7.5rem', '15rem'],
      ['6.0469rem', '9.675rem', '19.35rem'],
    ] as const,

    css: ([width, height]) => ({ width, height }),
  })}
`;

export const stylesSquare = css`
  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,
    sizes: [['7.5rem', '7.5rem', '15rem']] as const,

    css: ([unit]) => ({
      width: unit,
      maxWidth: unit,
      height: unit,
      maxHeight: unit,
    }),
  })}
`;

export const stylesImageWrapper = (
  (variant: Variant = 'text'): SerializedStyles => (
    css`
      position: relative;
      display: block;
      margin: 0 auto;

      ${variant === 'text' ? stylesText : stylesSquare}

      a {
        display: block;
        position: relative;
        width: 100%;
        height: 100%;

        &:focus {
          outline: #ffda73 auto 2px;
          outline-offset: 8px;
        }

        &:focus:not(.focus-visible) {
          outline: 0;
        }
      }
    `
  )
);

export const stylesImage = css`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center center;
`;
