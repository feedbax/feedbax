/** @jsx jsx */

import React from 'react';

import { jsx } from '@emotion/react';
import { stylesFront, stylesFrontContent } from './styles';
import { stylesTitleAndLogin, stylesMore } from './styles';

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

const Home = React.memo(
  (): JSX.Element => (
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
  ),
);

export default Home;
