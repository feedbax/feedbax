import { css } from '@emotion/react';
import { fluidRange } from '~lib/css-helper';

export const stylesWrapper = css`
  position: relative;
  overflow: hidden;
  
  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,
    sizes: [['1.63rem', '1.63rem', '3.25rem']] as const,
    css: ([marginY]) => ({ margin: `${marginY} 0` }),
  })}
`;

export const stylesSlider = css`
  position: relative;
`;
