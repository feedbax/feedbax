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

  margin: 0 25px;
  min-width: 320px;
`;

export const stylesItem = css`
  padding: 8px 5px;

  color: #fff;
  font-size: 24px;
  line-height: 24px;
  font-family: "Roboto Slab";
  text-decoration: none;

  * {
    display: inline-block;
    color: #fff;
    font-size: 24px;
    line-height: 24px;
    font-family: "Roboto Slab";
    text-decoration: none;
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
  @media (max-width: 600px) {
    position: absolute;
    top: 25px;
    left: 25px;
  }
`;

export const stylesIconButtonClose = css`
  @media (max-width: 600px) {
    position: absolute;
    top: 25px;
    right: 25px;
  }
`;

export const stylesHide = css`
  visibility: hidden;
`;

export const stylesShow = css`
  visibility: visible;
`;
