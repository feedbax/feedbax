/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React, { useEffect, useState } from "react";
import { Router } from "@reach/router";

import { jsx, css } from "@emotion/react";

import Layout from "~components/Layout";
import Loading from "~components/join/Loading";
import Logo from "~components/Logo";

import Questions from "~components/event/Questions";
import Slider from "~components/event/Slider";
import Pagination from "~components/event/Pagination";
import Filter from "~components/event/Filter";

import { Provider } from "react-redux";
import { store } from "~store";

type Props = {
  path: string;
  eventSlug?: string;
};

function Event({ eventSlug }: Props) {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <>
      <Loading state={isLoading ? "visible" : "hidden"} />

      <div css={stylesEvent}>
        <div className="scroll-container">
          <div css={stylesEventHeader}>
            <div className="content">
              <Logo
                variant="no-shadow-and-text"
                styles={{
                  height: 60,
                  width: 60,
                }}
              />

              <Pagination />

              <Slider>
                <Questions />
              </Slider>

              <Filter />
            </div>
          </div>

          <div className="answers">
            {new Array(100).fill(0).map((_, i) => (
              <div key={i} className="answer" />
            ))}
          </div>
        </div>

        <div className="toolbar" />
      </div>
    </>
  );
}

export default function Join() {
  return (
    <Provider store={store}>
      <Layout color="third">
        <Router>
          <Event path="/join/:eventSlug" />
          <Event path="/:eventSlug" />
        </Router>
      </Layout>
    </Provider>
  );
}

const stylesEventHeader = css`
  position: relative;
  background-color: #ff7d65;

  .content {
    position: relative;
    width: 100%;
    max-width: 540px;
    margin: 0 auto;
    padding-top: 25px;
    overflow: hidden;
  }
`;

const stylesEvent = css`
  position: relative;
  display: block;
  max-height: 100vh;
  max-height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .scroll-container {
    flex: 1 1 auto;
    overflow-y: scroll;
    touch-action: pan-y;

    .answers {
      padding: 15px;
      box-sizing: border-box;

      .answer {
        max-width: 540px;
        margin: 15px auto;
        padding: 15px;
        box-sizing: border-box;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px;
        position: relative;
      }
    }
  }

  .toolbar {
    flex: 0 0 auto;
    width: 100%;
    height: 60px;
    background: #3a5568;
  }
`;
