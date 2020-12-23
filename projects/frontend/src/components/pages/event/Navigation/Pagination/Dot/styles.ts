import { css } from '@emotion/react';
import { fluidRange } from '~lib/css-helper';
import { colors } from '~theme';
import { DOT_SIZE_DOT, DOT_SIZE_MARGIN } from '../const';

export const stylesDot = css`
  flex: 0 0 auto;

  position: relative;
  background-color: ${colors.third};
  border-radius: 50%;
  transition: transform 0.3s ease 0s, opacity 0.3s ease 0s;
  transform: scale(0.6);
  opacity: 0.6;

  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      [`${DOT_SIZE_MARGIN}rem`, `${DOT_SIZE_MARGIN}rem`, `${2 * DOT_SIZE_MARGIN}rem`],
      [`${DOT_SIZE_DOT}rem`, `${DOT_SIZE_DOT}rem`, `${2 * DOT_SIZE_DOT}rem`],
    ] as const,

    css: ([marginX, size]) => ({
      width: size,
      height: size,
      margin: `0 ${marginX}`,
    }),
  })}
`;

export const stylesDotCurrent = css`
  transform: scale(1);
  opacity: 1;
`;
