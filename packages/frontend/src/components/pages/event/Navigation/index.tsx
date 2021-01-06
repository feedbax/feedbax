/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from 'react';

import { jsx } from '@emotion/react';
import { stylesNavigation } from './styles';

import Pagination from '~components/pages/event/Navigation/Pagination';

import { actions } from '~store/modules/questions';
import { store } from '~store';

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
          aria-label="previous question"
        />

        <div
          role="button"
          tabIndex={0}
          className="nav right"
          onClick={navigate(1)}
          onKeyPress={navigate(1)}
          aria-label="next question"
        />

        <Pagination />
      </div>
    );
  },
);

export default Navigation;
