import { css } from '@emotion/react';
import { fluidRange } from '~lib/css-helper';

import type { SerializedStyles } from '@emotion/react';
import type { Variant } from './types';

export const stylesText = css`
  ${fluidRange({
    prop: (px) => ({ height: px }),
    size: { from: '116px', to: '155px' },
    screen: { min: '320px', max: '1170px' },
  })}

  ${fluidRange({
    prop: (px) => ({ width: px }),
    size: { from: '90px', to: '120px' },
    screen: { min: '320px', max: '1170px' },
  })}

  max-height: 155px;
  max-width: 120px;
`;

export const stylesSquare = css`
  height: 120px;
  width: 120px;
  max-height: 120px;
  max-width: 120px;
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
