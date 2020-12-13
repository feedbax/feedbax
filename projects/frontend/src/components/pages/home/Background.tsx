/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/react';

import top from '~assets/images/top.svg';
import bot from '~assets/images/bot.svg';
import { colors } from '~theme';

export default function Background() {
  return (
    <div css={stylesBackround}>
      <div className="img top" />
      <div className="img bot" />
    </div>
  );
}

const stylesBackround = css`
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  max-height: 100vh;
  max-height: calc(100vh + 0.25 * 100vw);
  max-height: calc((var(--vh, 1vh) * 100) + 0.25 * 100vw);

  background-color: ${colors.third};

  z-index: 0 !important;

  & .img {
    position: absolute;
    width: 100%;
    height: 100%;

    background-size: 100%;
    background-repeat: no-repeat;
  }

  & .top {
    background-image: url(${top});
    background-position: top right;

    right: 0;
    top: 0;

    max-width: 70%;
  }

  & .bot {
    background-image: url(${bot});
    background-position: bottom;

    padding-bottom: 1px;
  }

  @media (orientation: portrait) {
    & .top {
      max-width: 100%;
    }
  }
`;
