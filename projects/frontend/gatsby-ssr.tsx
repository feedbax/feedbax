import React from "react";

import { TranslationContext } from "~i18n";
import { translations } from "~i18n/locales";

import type { Locales } from "~i18n/locales";
import type { WrapPageElementNodeArgs } from "gatsby";

type Props = WrapPageElementNodeArgs & {
  props: {
    pageContext: {
      originalPath: string;
      locale: Locales;
    };
  };
};

export const wrapPageElement = ({ element, props }: Props) => {
  const { locale, originalPath } = props.pageContext;
  const translation = translations[locale];

  return (
    <TranslationContext.Provider
      value={{
        originalPath,
        translation,
        locale,
      }}
    >
      {element}
    </TranslationContext.Provider>
  );
};