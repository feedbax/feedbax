import { css } from '@emotion/react';
import { cssVar, fluidRange } from '~lib/css-helper';

export const stylesItems = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      ['1.2rem',  '1.56rem',    '3.13rem'],
      ['15rem',   '20rem',      '40rem'],
    ] as const,

    css: ([marginY, minWidth]) => ({
      margin: `0 ${marginY}`,
      minWidth,
    }),
  })}
`;

export const stylesItem = css`
  color: ${cssVar('--color-primary-text')};
  font-family: ${cssVar('--font-feedbax-secondary')};
  text-decoration: none;

  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      ['1.5rem',    '2rem',       '4rem'],
      ['0.4rem',    '0.5rem',     '1rem'],
      ['0.21rem',   '0.31rem',    '0.63rem'],
    ] as const,

    css: ([unit, paddingX, paddingY]) => ({
      fontSize: unit,
      lineHeight: unit,
      padding: `${paddingX} ${paddingY}`,

      '*': {
        fontSize: unit,
        lineHeight: unit,
      },
    }),
  })}

  * {
    display: inline-block;
    color: ${cssVar('--color-primary-text')};
    font-family: ${cssVar('--font-feedbax-secondary')};
    text-decoration: none;

    &:focus {
      outline: none;
    }
  }
`;

export const stylesTabable = css`  
  &:hover {
    opacity: 0.6;
  }

  &:active {
    opacity: 1;
  }
`;

export const stylesIconButtonBack = css`
  @media (max-width: 37.5rem) {
    position: absolute;
    top: 1.5625rem;
    left: 1.5625rem;
  }
`;

export const stylesIconButtonClose = css`
  @media (max-width: 37.5rem) {
    position: absolute;
    top: 1.5625rem;
    right: 1.5625rem;
  }
`;

export const stylesHide = css`
  visibility: hidden;
`;

export const stylesShow = css`
  visibility: visible;
`;
