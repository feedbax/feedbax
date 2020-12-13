/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/react';

import { colors } from '~theme';

import Background from '~components/frontpage/Background';
import Title from '~components/frontpage/Title';
import EventLogin from '~components/frontpage/EventLogin';
import SeeMore from '~components/frontpage/SeeMore';
import YourTool from '~components/frontpage/YourTool';
import Benefits from '~components/frontpage/Benefits';

import GlobalStyles from '~components/GlobalStyles';
import MenuButton from '~components/Menu';
import Logo from '~components/Logo';
import Footer from '~components/Footer';

export default function Home(): JSX.Element {
  return (
    <div css={stylesFront}>
      <GlobalStyles />
      <MenuButton />

      <Background />

      <div css={stylesFrontContent}>
        <Logo styles={{ marginTop: '30px' }} />

        <div>
          <Title />
          <EventLogin />
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
`;

const stylesFrontContent = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
`;
