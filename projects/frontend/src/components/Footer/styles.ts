import { css } from '@emotion/react';
import { cssVar, fluidRange } from '~lib/css-helper';

export const stylesFooter = css`
  position: relative;
  text-align: center;

  font-family: ${cssVar('--font-feedbax-tertiary')};
  font-style: normal;

  color: ${cssVar('--color-primary-text')};
  background-color: ${cssVar('--color-background-footer')};


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

      '.copy, .link': {
        fontSize: fontSizeLinks,
      },
    }),
  })}

  .title {
    font-weight: bold;
  }

  .copy, .link {
    font-weight: normal;
    color: ${cssVar('--color-primary-text')};
    margin: 0 5px;

    &:visited {
      color: ${cssVar('--color-primary-text')};
    }
  }
`;
