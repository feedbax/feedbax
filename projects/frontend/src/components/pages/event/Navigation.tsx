/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from 'react';

import { jsx, css } from '@emotion/react';

import Pagination from '~components/pages/event/Pagination';

import { actions } from '~store/modules/questions';
import { store } from '~store';
import { colors } from '~theme';

const Navigation = React.memo(() => {
  const navigateLeft = () => {
    const action = actions.addToCurrentIndex(-1);
    store.dispatch(action);
  };

  const navigateRight = () => {
    const action = actions.addToCurrentIndex(1);
    store.dispatch(action);
  };

  return (
    <div css={stylesNavigation}>
      <div className="nav left" onClick={navigateLeft}>
        <b />
      </div>
      <div className="nav right" onClick={navigateRight}>
        <b />
      </div>

      <Pagination />
    </div>
  );
});

export default Navigation;

const stylesNavigation = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  box-sizing: border-box;

  .nav {
    position: absolute;
    padding: 15px;

    cursor: pointer;

    b {
      display: block;
      position: relative;
      border: 2px solid ${colors.third};
      border-top: 0;
      border-left: 0;
      padding: 4px;
    }

    &:hover {
      opacity: 0.6;
    }

    &.left {
      left: 0;
      transform: translateX(-65px);

      b {
        transform: rotate(135deg);
      }
    }

    &.right {
      right: 0;
      transform: translateX(65px);

      b {
        transform: rotate(-45deg);
      }
    }
  }
`;
