import { css } from '@emotion/react';
import { transparentize } from 'polished';
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

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
