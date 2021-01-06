import { css } from '@emotion/react';
import { fluidRange } from '~lib/css-helper';

export const stylesFilters = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,
    sizes: [['1.63rem', '1.63rem', '3.25rem']] as const,
    css: ([paddingBottom]) => ({ paddingBottom }),
  })}
`;
