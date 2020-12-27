import { css } from '@emotion/react';
import { fluidRange } from '~lib/css-helper';

export const stylesConsentContent = css`
  flex: 0 0 auto;

  font-family: "Roboto Slab";
  text-align: justify;

  padding: 1rem;
  box-sizing: border-box;

  color: #fff;

  a {
    color: #fff;
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
