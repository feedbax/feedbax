import { css } from '@emotion/react';
import { colors } from '~theme';
import { fluidRange } from '~lib/css-helper';

export const stylesLegal = css`
  font-family: "Roboto Slab";

  position: relative;
  background-color: ${colors.first};

  color: ${colors.third};
  text-align: left;

  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      ['1.5rem',  '2.5rem',   '5rem'],
      ['2.75rem', '3.75rem',  '7.5rem'],
      ['1rem',    '1.5rem',   '3rem'],
      ['25rem',   '50rem',    '100rem'],
    ] as const,

    css: ([paddingTop, margin, fontSize, maxWidth]) => ({
      paddingTop,

      '.content': {
        margin: `${margin} auto`,
        fontSize,
        maxWidth,
      },
    }),
  })}

  * {
    color: ${colors.third};
  }

  .content {
    text-align: justify;
    padding: 0 20px;
    box-sizing: border-box;

    * {
      white-space: normal;
      overflow-wrap: break-word;
    }
  }
`;
