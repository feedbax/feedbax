import { css } from '@emotion/react';
import { fluidRange } from '~lib/css-helper';
import { colors } from '~theme';

export const stylesFooter = css`
  position: relative;
  text-align: center;

  font-family: "Klinic Slab Book";
  font-style: normal;

  color: ${colors.third};
  background-color: ${colors.fourth};


  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      ['1.5rem',  '2.5rem',   '5rem'],
      ['0.5rem',  '0.88rem',  '1.75rem'],
      ['2.25rem', '5rem',     '10rem'],
      ['0.75rem', '1.63rem',  '3.25rem'],
    ] as const,

    css: ([padding, marginBottom, fontSizeTitle, fontSizeLinks]) => ({
      padding,

      '.title': {
        marginBottom,
        fontSize: fontSizeTitle,
      },

      '.copy, .links': {
        fontSize: fontSizeLinks,
      },
    }),
  })}

  .title {
    font-weight: bold;
  }

  .copy, .links {
    font-weight: normal;
    color: ${colors.third};

    &:visited {
      color: ${colors.third};
    }
  }
`;
