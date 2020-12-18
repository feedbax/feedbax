/** @jsx jsx */

import React from 'react';

import { jsx, css } from '@emotion/react';
import { colors } from '~theme';
import { between } from 'polished';

import Background from '~components/pages/home/Background';
import Title from '~components/pages/home/Title';
import EventLogin from '~components/pages/home/EventLogin';
import SeeMore from '~components/pages/home/SeeMore';
import YourTool from '~components/pages/home/YourTool';
import Benefits from '~components/pages/home/Benefits';

import GlobalStyles from '~components/GlobalStyles';
import MenuButton from '~components/Menu';
import Logo from '~components/Logo';
import Footer from '~components/Footer';

import 'focus-visible';

export default function Home (): JSX.Element {
  return (
    <div css={stylesFront}>
      <GlobalStyles />
      <MenuButton />

      <Background />

      <div css={stylesFrontContent}>
        <Logo />

        <div css={stylesTitleAndLogin}>
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
  box-sizing: border-box;
  padding-top: ${between('96px', '190px', '320px', '2560px')};
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

  padding-top: ${between('1.5rem', '2.5rem', '20rem', '160rem')};
`;

const stylesTitleAndLogin = css`
  box-sizing: border-box;
  padding: 0 25px;
`;
