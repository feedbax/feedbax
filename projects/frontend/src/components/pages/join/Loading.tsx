/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from 'react';

import { jsx, css, keyframes } from '@emotion/react';
import { colors } from '~theme';

import { motion } from 'framer-motion';

import Logo from '~components/Logo';
import Background from './Background';

import type { CSSInterpolation } from '@emotion/serialize';

type Props = {
  state?: 'visible' | 'hidden';
  styles?: CSSInterpolation;
};

const variants = {
  visible: {
    opacity: 1,
    display: 'flex',
  },

  hidden: {
    opacity: 0,
    transitionEnd: {
      display: 'none',
    },
  },
};

const Loading = React.memo(
  (props: Props) => {
    const { styles = {} } = props;
    const { state = 'visible' } = props;

    return (
      <motion.div
        css={[stylesLoading, styles]}
        initial="visible"
        animate={state}
        variants={variants}
      >
        <Background />

        <div className="logo-loading">
          <div className="pulse" />
          <Logo />
        </div>
      </motion.div>
    );
  },
);

export default Loading;

const pulse = keyframes`
  from {
    transform: scale(0);
    opacity: 1;
  }

  to {
    transform: scale(1);
    opacity: 0;
  }
`;

const stylesLoading = css`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  overflow: hidden;
  z-index: 1000;
  background-color: ${colors.second};

  .logo-loading {
    position: relative;
    width: 160px;
    height: 160px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 50%;

    .pulse {
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      border-radius: 50%;
      background-color: ${colors.third};

      transform: scale(0);
      opacity: 1;

      animation: ${pulse} 1s ease infinite;
    }
  }
`;
