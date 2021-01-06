import { css } from '@emotion/react';
import { cssVar, fluidRange } from '~lib/css-helper';

export const stylesBackround = css`
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;

  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);

  background-color: ${cssVar('--color-primary-text')};

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
    height: auto;

    svg {
      display: block;
    }
  }

  & .top {
    max-width: 70%;
    top: 0;
    right: 0;
  }

  & .bot {
    bottom: -4px;
    left: 0;
  }

  @media (orientation: portrait) {
    & .top {
      max-width: 100%;
    }
  }
`;
