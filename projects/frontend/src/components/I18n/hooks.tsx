/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React, { useMemo } from "react";

import { jsx, css } from "@emotion/react";
import { useTwemoji } from "~hooks";

import { useTranslation } from "~i18n";
import { locales } from "~i18n/locales";

import LocaleLink from "~components/I18n/LocaleLink";

import type { Location } from "~i18n";
import type { Locales } from "~i18n/locales";

import type { MenuItem } from "~components/Menu";

const parameterizedPath = (location: Location) => {
  const params = Object.entries(location.params);
  const path = location.matchPath ?? location.path;

  let _path = path;

  for (let i = 0; i < params.length; i += 1) {
    const [key, value] = params[i];

    if (typeof value === "string") {
      _path = _path.replaceAll(new RegExp(`:${key}`, "gm"), value);
    }
  }

  return _path;
};

type Props = {
  children: string;
  location: Location;
  locale: Locales;
};

const Language = React.memo((props: Props) => {
  const { locale, children } = props;
  const { location } = props;

  const path = parameterizedPath(location);
  const { injectEmojis } = useTwemoji();

  return (
    <LocaleLink to={path} locale={locale} css={stylesEmojis}>
      <div className="text" ref={injectEmojis}>
        {children}
      </div>
      <i className="seperator" />
    </LocaleLink>
  );
});

export const useLanguageMenu = (): MenuItem[] => {
  const { locale, location, t } = useTranslation();
  const _locales = locales.filter((_locale) => _locale !== locale);

  const menuItems = useMemo(
    () => [
      {
        key: "change-locale",
        content: t("menu", "change-locale"),

        items: _locales.map(_locale => ({
          key: `change-locale-${_locale}`,
          content: (
            <Language
              key={_locale}
              locale={_locale}
              location={location}
            >
              {t("locales", _locale)}
            </Language>
          ),
        })),
      },
    ],
    [locale, location, t]
  );

  return menuItems;
};

const stylesEmojis = css`
  img.emoji {
    vertical-align: middle;
  }
`;