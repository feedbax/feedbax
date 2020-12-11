import React from "react";

import { TranslationContext } from "~i18n";
import { translations } from "~i18n/locales";

import type { Locales } from "~i18n/locales";
import type { WrapPageElementNodeArgs } from "gatsby";

type Props = WrapPageElementNodeArgs & {
  props: {
    pageContext: {
      originalPath: string;
      originalMatchPath?: string;
      locale: Locales;
    };
  };
};

export const wrapPageElement = ({ element, props }: Props) => {
  const { params, pageContext } = props;
  const { locale, originalPath, originalMatchPath } = pageContext;
  const translation = translations[locale];

  return (
    <TranslationContext.Provider
      value={{
        translation,
        locale,

        location: {
          params,
          path: originalPath,
          matchPath: originalMatchPath,
        },
      }}
    >
      {element}
    </TranslationContext.Provider>
  );
};
