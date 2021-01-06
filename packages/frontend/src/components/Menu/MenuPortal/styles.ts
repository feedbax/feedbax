import { css } from '@emotion/react';
import { cssVar, fluidRange } from '~lib/css-helper';

export const stylesMenuContent = css`
  flex: 1 1 auto;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,
    sizes: [['20rem', '30rem', '60rem']] as const,
    css: ([maxWidth]) => ({ maxWidth }),
  })}
`;

export const stylesItems = css`
  margin: 0 auto;
`;

export const stylesItem = css`
  color: ${cssVar('--color-primary-text')};
  font-family: ${cssVar('--font-feedbax-secondary')};
  text-decoration: none;

  position: relative;

  .icon {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      flex: 0 0 auto;
      width: 0.8em;
      height: 0.8em;
    }
  }

  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      ['1.5rem',  '2rem',   '4rem'],
      ['0.4rem',  '0.5rem', '1rem'],
    ] as const,

    css: ([unit, paddingY]) => ({
      fontSize: unit,
      lineHeight: unit,
      padding: `${paddingY} 1.2em`,

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
