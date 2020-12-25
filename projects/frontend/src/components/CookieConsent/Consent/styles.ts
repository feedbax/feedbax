import { css } from '@emotion/react';
import { transparentize } from 'polished';
import { fluidRange } from '~lib/css-helper';
import { colors } from '~theme';

export const stylesConsent = css`
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

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

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
