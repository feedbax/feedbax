/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from "react";

import { jsx, css } from "@emotion/react";
import { colors } from "~theme";

import { useTranslation } from "~i18n";
import { locales } from "~i18n/locales";

import LocaleLink from "~components/i18n/LocaleLink";

type Props = {
  children: string;
  isCurrent: boolean;
  to: string;
};

const Language = React.memo((props: Props) => {
  const { children: language } = props;
  const { isCurrent, to } = props;

  const styles = isCurrent ? [stylesLanguageLinkCurrent] : [];

  return (
    <LocaleLink to={to} locale={language} css={[stylesLanguageLink, ...styles]}>
      <div className="text">{language}</div>
      <i className="seperator" />
    </LocaleLink>
  );
});

export const LanguageSelector = React.memo(() => {
  const { originalPath, locale } = useTranslation();

  return (
    <div css={stylesLanguages}>
      {locales.map(_locale => (
        <Language
          key={_locale}
          isCurrent={_locale === locale}
          to={originalPath}
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

const stylesLanguageLink = css`
  color: ${colors.third};

  flex: 0 0 auto;
  position: relative;

  font-family: "Roboto Slab";
  font-size: 16px;
  font-weight: normal;

  cursor: pointer;
  color: ${colors.third};
  padding: 10px 5px;
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .text {
    flex: 0 0 auto;
  }

  .seperator {
    flex: 0 0 auto;
    display: block;
    width: 1px;
    height: 16px;
    background: ${colors.third};
    margin-left: 10px;
  }

  &:last-of-type .seperator {
    display: none;
  }
`;

const stylesLanguageLinkCurrent = css`
  font-weight: bold;
`;
