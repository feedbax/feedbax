/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React, { useEffect, useState } from 'react';

import { Router } from '@reach/router';
import { Provider } from 'react-redux';

import { jsx } from '@emotion/react';

import GlobalStyles from '~components/GlobalStyles';
import Loading from '~components/join/Loading';
import Event from '~components/event/Event';

import { store } from '~store';
import { actions } from '~store/modules/questions';

type Props = {
  path: string;
  eventSlug?: string;
  questionIndex?: string;
};

function JoinRoute({ questionIndex }: Props) {
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
}

export default function Join(): JSX.Element {
  return (
    <Provider store={store}>
      <GlobalStyles color="third" />

      <Router>
        <JoinRoute path=":locale/@/:eventSlug/:questionIndex" />
        <JoinRoute path=":locale/@/:eventSlug" />
        <JoinRoute path=":locale/@" />
        <JoinRoute path="/@/:eventSlug/:questionIndex" />
        <JoinRoute path="/@/:eventSlug" />
        <JoinRoute path="/@" />
      </Router>
    </Provider>
  );
}
