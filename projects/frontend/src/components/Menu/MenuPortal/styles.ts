import { css } from '@emotion/react';
import { transparentize } from 'polished';
import { fluidRange } from '~lib/css-helper';
import { colors } from '~theme';

export const stylesPortal = css`
  position: absolute;
  position: fixed;

  left: 0;
  top: 0;
  overflow: hidden;
  z-index: 9999;

  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);

  background-color: ${transparentize(0.2, colors.first)};
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const stylesItems = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      ['1.2rem',  '1.5625rem',  '3.125rem'],
      ['15rem',   '20rem',      '40rem'],
    ] as const,

    css: ([marginY, minWidth]) => ({
      margin: `0 ${marginY}`,
      minWidth,
    }),
  })}
`;

export const stylesItem = css`
  color: #fff;
  font-family: "Roboto Slab";
  text-decoration: none;

  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      ['1.5rem',    '2rem',       '4rem'],
      ['0.4rem',    '0.5rem',     '1rem'],
      ['0.2125rem', '0.3125rem',  '0.625rem'],
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
    color: #fff;
    font-family: "Roboto Slab";
    text-decoration: none;

    &:focus {
      outline: 0;
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

  &:focus {
    outline: #ffda73 auto 2px;
    outline-offset: 8px;
  }

  &:focus:not(.focus-visible) {
    outline: 0;
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
