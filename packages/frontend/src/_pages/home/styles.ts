import { css } from '@emotion/react';
import { cssVar, fluidRange } from '~lib/css-helper';

export const stylesMore = css`
  position: relative;
  padding: 20px;
  box-sizing: border-box;

  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,
    sizes: [['6rem', '11.88rem', '23.75rem']] as const,
    css: ([paddingTop]) => ({ paddingTop }),
  })}
`;

export const stylesFront = css`
  position: relative;

  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);

  background-color: ${cssVar('--color-feedbax-primary')};

  & * {
    z-index: 1;
  }
`;

export const stylesFrontContent = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);

  ${fluidRange({
    screen: ['20rem', '67.5rem', '135rem'] as const,
    sizes: [['64rem', '64rem', '128rem']] as const,

    css: ([maxHeight]) => ({
      '@media (orientation: portrait)': {
        maxHeight,
      },
    }),
  })}

  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      ['31.06rem',  '52.09rem',  '104.19rem'],
      ['1.5rem',    '2.5rem',    '5rem'],
    ] as const,

    css: ([minHeight, paddingTop]) => ({
      minHeight,
      paddingTop,
    }),
  })}

  box-sizing: border-box;
`;

export const stylesTitleAndLogin = css`
  box-sizing: border-box;
  padding: 0 25px;
`;
