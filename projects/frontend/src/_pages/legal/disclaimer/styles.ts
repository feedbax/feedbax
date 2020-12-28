import { css } from '@emotion/react';
import { cssVar, fluidRange } from '~lib/css-helper';

export const stylesLegal = css`
  font-family: ${cssVar('--font-feedbax-secondary')};

  position: relative;
  background-color: ${cssVar('--color-feedbax-primary')};

  color: ${cssVar('--color-primary-text')};
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
    color: ${cssVar('--color-primary-text')};
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
