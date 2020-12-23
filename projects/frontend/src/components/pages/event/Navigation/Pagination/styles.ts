import { css, SerializedStyles } from '@emotion/react';
import { fluidRange } from '~lib/css-helper';
import { MAX_DOTS, DOT_SIZE_FULL } from './const';

export const stylesNull = css({});

export const getShift = (
  (shiftX: number): SerializedStyles => css`
    ${fluidRange({
      screen: ['20rem', '120rem', '240rem'] as const,
      sizes: [[`-${shiftX}rem`, `-${shiftX}rem`, `-${2 * shiftX}rem`]] as const,
      css: ([translateX]) => ({ transform: `translateX(${translateX})` }),
    })}
  `
);

export const stylesDots = css`
  position: relative;

  width: ${MAX_DOTS * DOT_SIZE_FULL}px;

  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [[
      `${MAX_DOTS * DOT_SIZE_FULL}rem`,
      `${MAX_DOTS * DOT_SIZE_FULL}rem`,
      `${2 * MAX_DOTS * DOT_SIZE_FULL}rem`,
    ]] as const,

    css: ([width]) => ({ width }),
  })}

  overflow: hidden;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  .wrapper {
    flex: 0 0 auto;
    transition: transform 0.3s ease 0s, opacity 0.3s ease 0s;

    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;
