import { css } from '@emotion/react';
import { fluidRange } from '~lib/css-helper';

export const stylesMenuButton = css`
  position: absolute;
  z-index: 999 !important;

  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,
    sizes: [['1.5625rem', '1.5625rem', '3.125rem']] as const,

    css: ([unit]) => ({
      top: unit,
      right: unit,
    }),
  })}
`;
