import { css } from '@emotion/react';
import { cssVar } from '~lib/css-helper';

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

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const stylesBackground = css`
  position: absolute;
  z-index: -1;

  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  background-color: ${cssVar('--color-feedbax-primary')};
  opacity: 0.8;
`;
