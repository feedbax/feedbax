/** @jsx jsx */

import React, { useState, useCallback } from "react";

import Background from "~components/frontpage/Background";
import Title from "~components/frontpage/Title";
import EventLogin from "~components/frontpage/EventLogin";
import SeeMore from "~components/frontpage/SeeMore";
import YourTool from "~components/frontpage/YourTool";
import Benefits from "~components/frontpage/Benefits";

import GlobalStyles from "~components/GlobalStyles";
import { Languages } from "~components/I18n";

import Logo from "~components/Logo";
import Footer from "~components/Footer";

import { jsx, css } from "@emotion/react";
import { colors } from "~theme";

import { navigate } from "gatsby";

export default function Home() {
  const eventCodeState = useState<string>("");
  const [eventCode] = eventCodeState;

  const onLogin = useCallback(() => navigate(`/@/${eventCode}`), [eventCode]);

  return (
    <div css={stylesFront}>
      <GlobalStyles />
      <Languages />

      <Background />

      <div className="content">
        <Logo styles={{ marginTop: "30px" }} />

        <div>
          <Title />

          <EventLogin onLogin={onLogin} eventCodeState={eventCodeState} />
        </div>

        <SeeMore />
      </div>

      <div css={stylesMore}>
        <YourTool />
        <Benefits />
      </div>

      <Footer />
    </div>
  );
}

const stylesMore = css`
  position: relative;
  padding: 20px;
  padding-top: 100px;
  box-sizing: border-box;
`;

const stylesFront = css`
  position: relative;

  min-height: 100vh;
  min-height: calc(100vh + 0.25 * 100vw);
  min-height: calc((var(--vh, 1vh) * 100) + 0.25 * 100vw);

  background-color: ${colors.first};

  & * {
    z-index: 1;
  }

  & .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    min-height: 100vh;
    min-height: calc(var(--vh, 1vh) * 100);
  }
`;
