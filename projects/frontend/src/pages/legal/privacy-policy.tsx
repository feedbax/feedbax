/** @jsx jsx */

import "react";

import { jsx, css } from "@emotion/react";
import { colors } from "~theme";

import GlobalStyles from "~components/GlobalStyles";
import I18n from "~components/I18n";

import Footer from "~components/Footer";
import Logo from "~components/Logo";
import { useTranslation } from "react-i18next";

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  const Content = t("privacy-policy:content");

  return (
    <div css={stylesLegal}>
      <GlobalStyles />
      <I18n />

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
