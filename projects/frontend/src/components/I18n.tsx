/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from "react";
import { jsx, css } from "@emotion/react";

import { languages } from "~i18n";
import { useTranslation } from "react-i18next";

export default function I18n() {
  const { i18n } = useTranslation();

  return (
    <div css={stylesLanguages}>
      {languages.map(language => (
        <React.Fragment key={language}>
          <span
            onClick={() => i18n.changeLanguage(language)}
            css={language === i18n.language ? stlyesCurrentLanguage : null}
          >
            {language}
          </span>
          <b />
        </React.Fragment>
      ))}
    </div>
  );
}

const stylesLanguages = css`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 999 !important;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  b {
    flex: 0 0 auto;

    display: block;
    width: 1px;
    height: 16px;
    background-color: #fff;

    &:last-of-type {
      display: none;
    }
  }

  span {
    flex: 0 0 auto;

    display: block;
    font-family: "Roboto Slab";
    font-size: 16px;
    font-weight: normal;

    cursor: pointer;
    color: #fff;
    padding: 10px;
    box-sizing: border-box;
  }
`;

const stlyesCurrentLanguage = css`
  font-weight: bold !important;
`;
