/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React, { useEffect, useState } from 'react';

import { Router } from '@reach/router';
import { Provider } from 'react-redux';

import { jsx } from '@emotion/react';

import CookieConsent from '~components/CookieConsent';

import Loading from '~components/pages/join/Loading';
import Event from '~components/pages/event/Event';

import { store } from '~store';
import { actions } from '~store/modules/questions';

type Props = {
  path: string;
  eventSlug?: string;
  questionIndex?: string;
};

const EventRoute = React.memo(
  ({ questionIndex }: Props) => {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
      const timeout = setTimeout(() => setLoading(false), 2000);

      if (typeof questionIndex !== 'undefined') {
        const $questionIndex = parseInt(questionIndex, 10) - 1;
        store.dispatch(actions.setCurrentIndex($questionIndex));
      }

      return () => {
        clearTimeout(timeout);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <>
        <Loading state={isLoading ? 'visible' : 'hidden'} />
        <Event />
      </>
    );
  },
);

const Join = React.memo(
  (): JSX.Element => (
    <Provider store={store}>
      <CookieConsent />

      <Router>
        <EventRoute path=":locale/@/:eventSlug/:questionIndex" />
        <EventRoute path=":locale/@/:eventSlug" />
        <EventRoute path=":locale/@" />
        <EventRoute path="/@/:eventSlug/:questionIndex" />
        <EventRoute path="/@/:eventSlug" />
        <EventRoute path="/@" />
      </Router>
    </Provider>
  ),
);

export default Join;
