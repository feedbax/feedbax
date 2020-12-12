/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/react';
import { useTranslation } from '~i18n';

import { colors } from '~theme';

import GlobalStyles from '~components/GlobalStyles';

import Footer from '~components/Footer';
import Logo from '~components/Logo';
import MenuButton from '~components/Menu';

export default function PrivacyPolicy(): JSX.Element {
  const { t } = useTranslation();
  const Content = t('privacy-policy', 'content');

  return (
    <div css={stylesLegal}>
      <GlobalStyles />
      <MenuButton color={{ background: 'first' }} />

      <Logo />

      <div className="content">
        <Content />
      </div>

      <Footer />
    </div>
  );
}

const stylesLegal = css`
  font-family: "Roboto Slab";

  position: relative;
  background-color: ${colors.first};

  color: ${colors.third};
  text-align: left;

  padding-top: 30px;

  * {
    color: ${colors.third};
  }

  .content {
    max-width: 600px;

    margin: 60px auto;
    padding: 0 20px;
    box-sizing: border-box;
  }
`;
