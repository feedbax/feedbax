import { css } from '@emotion/react';
import { fluidRange } from '~lib/css-helper';

import type { SerializedStyles } from '@emotion/react';
import type { LogoProps } from './types';

export const stylesText = (
  (sizeFactor: number): SerializedStyles => css`
    ${fluidRange({
      screen: ['20rem', '120rem', '240rem'] as const,

      sizes: [
        [
          `${4.6875 * sizeFactor}rem`,
          `${7.5 * sizeFactor}rem`,
          `${15 * sizeFactor}rem`,
        ],

        [
          `${6.0469 * sizeFactor}rem`,
          `${9.675 * sizeFactor}rem`,
          `${19.35 * sizeFactor}rem`,
        ],
      ] as const,

      css: ([width, height]) => ({ width, height }),
    })}
  `
);

export const stylesSquare = (
  (sizeFactor: number): SerializedStyles => css`
    ${fluidRange({
      screen: ['20rem', '120rem', '240rem'] as const,

      sizes: [[
        `${7.5 * sizeFactor}rem`,
        `${7.5 * sizeFactor}rem`,
        `${15 * sizeFactor}rem`,
      ]] as const,

      css: ([unit]) => ({
        width: unit,
        maxWidth: unit,
        height: unit,
        maxHeight: unit,
      }),
    })}
  `
);

export const stylesImageWrapper = (
  (props: LogoProps): SerializedStyles => {
    const { variant = 'text' } = props;
    const { sizeFactor = 1 } = props;

    return (
      css`
        position: relative;
        display: block;
        margin: 0 auto;
  
        ${
          variant === 'text'
            ? stylesText(sizeFactor)
            : stylesSquare(sizeFactor)
        }
  
        a {
          display: block;
          position: relative;
          width: 100%;
          height: 100%;
        }
      `
    );
  }
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
