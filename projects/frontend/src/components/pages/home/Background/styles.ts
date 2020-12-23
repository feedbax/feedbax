import { css } from '@emotion/react';
import { colors } from '~theme';
import { fluidRange } from '~lib/css-helper';

import backgroundTop from '~assets/images/top.svg';
import backgroundBottom from '~assets/images/bot.svg';

export const stylesBackround = css`
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;

  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);

  background-color: ${colors.third};
  padding-bottom: 30vw;

  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      ['31.06rem',  '52.09rem',  '104.19rem'],
      ['6rem',      '45rem',     '90rem'],
      ['0rem',     '-12.5rem',  '-25rem'],
      ['64rem',     '64rem',     '128rem'],
    ] as const,

    css: ([
      minHeight,
      paddingBottom,
      top,
      maxHeight,
    ]) => ({
      minHeight,
      paddingBottom,

      '.top': {
        top,
      },

      '@media (orientation: portrait)': {
        maxHeight,
      },
    }),
  })}

  z-index: 0 !important;

  & .img {
    position: absolute;
    width: 100%;
    height: 100%;

    background-size: 100%;
    background-repeat: no-repeat;
  }

  & .top {
    background-image: url(${backgroundTop});
    background-position: top right;
    max-width: 70%;
    right: 0;
  }

  & .bot {
    background-image: url(${backgroundBottom});
    background-position: bottom;

    padding-bottom: 4px;
  }

  @media (orientation: portrait) {
    & .top {
      max-width: 100%;
    }
  }
`;
