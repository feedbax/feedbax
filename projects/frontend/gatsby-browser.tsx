import React from "react";

import { TranslationContext, translations } from "~i18n";

import type { Locales } from "~i18n/locales";
import type { WrapPageElementBrowserArgs } from "gatsby";

type Props = WrapPageElementBrowserArgs & {
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
