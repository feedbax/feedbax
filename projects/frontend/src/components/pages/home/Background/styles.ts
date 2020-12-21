import { css } from '@emotion/react';
import { colors } from '~theme';
import { fluidRange } from '~lib/css-helper';

import bgTop from '~assets/images/top.svg';
import bgBot from '~assets/images/bot.svg';

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
    sizes: [['6rem', '45rem', '90rem']] as const,
    css: ([paddingBottom]) => ({ paddingBottom }),
  })}

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
    sizes: [['31.0625rem', '52.09375rem', '104.1875rem']] as const,
    css: ([minHeight]) => ({ minHeight }),
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
    background-image: url(${bgTop});
    background-position: top right;

    right: 0;

    ${fluidRange({
      screen: ['20rem', '120rem', '240rem'] as const,
      sizes: [['0rem', '-12.5rem', '-25rem']] as const,
      css: ([top]) => ({ top }),
    })}

    max-width: 70%;
  }

  & .bot {
    background-image: url(${bgBot});
    background-position: bottom;

    padding-bottom: 4px;
  }

  @media (orientation: portrait) {
    & .top {
      max-width: 100%;
    }
  }
`;
