/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from "react";
import { jsx, css } from "@emotion/react";

import { useTranslation } from "~i18n";
import { locales } from "~i18n/locales";

import { Link } from "gatsby";

type Props = {
  children: string;
  isCurrent: boolean;
  to: string;
};

const Language = React.memo((props: Props) => {
  const { children: language } = props;
  const { isCurrent, to } = props;

  const styles = isCurrent ? [stylesLanguageCurrent] : [];

  return (
    <Link to={to}>
      <div css={[stylesLanguage, ...styles]}>{language}</div>

      <i css={stylesSeperator} />
    </Link>
  );
});

export const Languages = React.memo(() => {
  const { originalPath, locale } = useTranslation();

  return (
    <div css={stylesLanguages}>
      {locales.map(_locale => (
        <Language
          key={_locale}
          isCurrent={_locale === locale}
          to={`/${_locale}${originalPath}`}
        >
          {_locale}
        </Language>
      ))}
    </div>
  );
});

const stylesLanguages = css`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 999 !important;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding: 0 5px;
  box-sizing: border-box;
`;

const stylesLanguage = css`
  flex: 0 0 auto;
  position: relative;

  display: block;
  font-family: "Roboto Slab";
  font-size: 16px;
  font-weight: normal;

  cursor: pointer;
  color: #fff;
  padding: 10px 5px;
  box-sizing: border-box;
`;

const stylesLanguageCurrent = css`
  font-weight: bold;
`;

const stylesSeperator = css`
  flex: 0 0 auto;
  display: block;
  width: 1px;
  height: 16px;
  background: #fff;

  &:last-of-type {
    display: none;
  }
`;
