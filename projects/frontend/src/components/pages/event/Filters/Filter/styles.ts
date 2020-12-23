import { css } from '@emotion/react';

export const stylesFilter = css`
  position: relative;
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease 0s, opacity 0.3s ease 0s;
  transform: scale(0.8);
  opacity: 1;

  &.current {
    transform: scale(1);
  }
`;

export const stylesFilterCurrent = css`
  transform: scale(1);
`;
