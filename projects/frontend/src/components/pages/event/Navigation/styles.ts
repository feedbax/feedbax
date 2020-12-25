import { css } from '@emotion/react';
import { fluidRange } from '~lib/css-helper';
import { colors } from '~theme';

export const stylesNavigation = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      ['1.63rem', '1.63rem', '3.25rem'],
      ['1rem', '1rem', '2rem'],
      ['0.13rem', '0.13rem', '0.25rem'],
      ['0.25rem', '0.25rem', '0.5rem'],
      ['-4rem', '-4rem', '-8rem'],
      ['4rem', '4rem', '8rem'],
    ] as const,

    css: ([
      marginTop,
      paddingNav,
      borderWidthNavAfter,
      paddingNavAfter,
      translateXNavLeft,
      translateXNavRight,
    ]) => ({
      marginTop,

      '.nav': {
        padding: paddingNav,

        '&::after': {
          padding: paddingNavAfter,
          border: `${borderWidthNavAfter} solid ${colors.third}`,

          borderTop: 0,
          borderLeft: 0,
        },

        '&.left': {
          transform: `translateX(${translateXNavLeft})`,
        },

        '&.right': {
          transform: `translateX(${translateXNavRight})`,
        },
      },
    }),
  })}

  .nav {
    position: absolute;
    cursor: pointer;

    &::after {
      content: '';
      display: block;
      position: relative;
    }

    &:hover {
      opacity: 0.6;
    }

    &.left {
      left: 0;

      &::after {
        transform: rotate(135deg);
      }
    }

    &.right {
      right: 0;

      &::after {
        transform: rotate(-45deg);
      }
    }
  }
`;
