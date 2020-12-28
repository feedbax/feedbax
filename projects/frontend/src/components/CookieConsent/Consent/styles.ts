import { css } from '@emotion/react';
import { cssVar, fluidRange } from '~lib/css-helper';

export const stylesConsentContent = css`
  flex: 0 0 auto;

  font-family: ${cssVar('--font-feedbax-secondary')};
  text-align: justify;

  padding: 1rem;
  box-sizing: border-box;

  color: ${cssVar('--color-primary-text')};

  a {
    color: ${cssVar('--color-primary-text')};
  }

  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      ['20rem', '40rem',  '80rem'],
      ['1rem',  '1.5rem', '3rem'],
    ] as const,

    css: ([maxWidth, fontSize]) => ({ maxWidth, fontSize }),
  })}
`;
