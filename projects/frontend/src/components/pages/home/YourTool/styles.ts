import { css } from '@emotion/react';
import { colors } from '~theme';
import { fluidRange } from '~lib/css-helper';

export const stylesTool = css`
  position: relative;
  width: 100%;

  margin: 0 auto;

  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      ['2.73rem', '3.13rem',  '6.25rem'],
      ['20rem',   '58rem',    '116rem'],
      ['2rem',    '3.6rem',   '7.2rem'],
      ['3.35rem', '3.75rem',  '7.5rem'],
    ] as const,

    css: ([marginTop, maxWidth, fontSize, paddingRight]) => ({
      marginTop,
      maxWidth,

      '.text': {
        fontSize,
        paddingRight,
      },

      '@media (max-width: 50rem)': {
        '.text': {
          marginTop,
        },
      },
    }),
  })}

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .text {
    flex: 1 0 0;
    position: relative;

    font-family: "Klinic Slab";
    font-style: normal;
    font-weight: normal;

    color: ${colors.third};

    text-align: right;
    box-sizing: border-box;
  }

  .image {
    flex: 1 1 auto;

    position: relative;
    display: block;
    width: 100%;
    max-width: 50%;
  }

  @media (max-width: 50rem) {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;

    .text {
      max-width: 100%;
      padding-right: 0;
      text-align: center;
    }

    .image {
      max-width: 35rem;
    }
  }
`;
