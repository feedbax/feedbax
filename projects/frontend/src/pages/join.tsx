/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React, { useEffect, useState } from "react";
import { Router } from "@reach/router";
import { Provider } from "react-redux";

import { jsx } from "@emotion/react";

import Layout from "~components/Layout";
import Loading from "~components/join/Loading";
import Event from "~components/event/Event";

import { store } from "~store";

type Props = {
  path: string;
  eventSlug?: string;
};

function JoinRoute({ eventSlug }: Props) {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <>
      <Loading state={isLoading ? "visible" : "hidden"} />
      <Event />
    </>
  );
}

export default function Join() {
  return (
    <Provider store={store}>
      <Layout color="third">
        <Router>
          <JoinRoute path="/join/:eventSlug" />
          <JoinRoute path="/:eventSlug" />
        </Router>
      </Layout>
    </Provider>
  );
}
