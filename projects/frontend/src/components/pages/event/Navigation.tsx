/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from 'react';

import { jsx, css } from '@emotion/react';

import Pagination from '~components/pages/event/Pagination';

import { actions } from '~store/modules/questions';
import { store } from '~store';
import { colors } from '~theme';

type _MouseEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;
type _KeyboardEvent = React.KeyboardEvent<HTMLDivElement>;
type Event = _MouseEvent | _KeyboardEvent;

const Navigation = React.memo(
  () => {
    const navigate = (
      (direction: number) => (
        (e: Event) => {
          e.preventDefault();
          e.stopPropagation();

          if ('key' in e) {
            const isSubmit = e.key === 'Enter' || e.key === ' ';
            if (!isSubmit) return;
          }

          const action = actions.addToCurrentIndex(direction);
          store.dispatch(action);
        }
      )
    );

    return (
      <div css={stylesNavigation}>
        <div
          role="button"
          tabIndex={0}
          className="nav left"
          onClick={navigate(-1)}
          onKeyPress={navigate(-1)}
        />

        <div
          role="button"
          tabIndex={0}
          className="nav right"
          onClick={navigate(1)}
          onKeyPress={navigate(1)}
        />

        <Pagination />
      </div>
    );
  },
);

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

    &::after {
      content: '';
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

    &:focus {
      outline: #ffda73 auto 2px;
      outline-offset: 8px;
    }

    &:focus:not(.focus-visible) {
      outline: 0;
    }

    &.left {
      left: 0;
      transform: translateX(-65px);

      &::after {
        transform: rotate(135deg);
      }
    }

    &.right {
      right: 0;
      transform: translateX(65px);

      &::after {
        transform: rotate(-45deg);
      }
    }
  }
`;
