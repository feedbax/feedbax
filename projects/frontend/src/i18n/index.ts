import React, { createContext, useContext } from "react";
import { translations, defaultLocale } from "~i18n/locales";

import type { Locales, Translations } from "~i18n/locales";

export type Location = {
  path: string;
  matchPath?: string;
  params: Record<string, string | undefined>;
};

export type Context = {
  translation: Translations;
  locale: Locales;
  location: Location;
};

export const TranslationContext = createContext<Context>({
  translation: translations.de,
  locale: defaultLocale,

  location: {
    path: "/",
    params: {},
  },
});

interface Translate {
  <P extends keyof Translations>(prop: P): Translations[P];

  <
    P1 extends keyof Translations,
    P2 extends keyof Translations[P1]
  >(prop1: P1, prop2: P2): Translations[P1][P2];

  <
    P1 extends keyof Translations,
    P2 extends keyof Translations[P1],
    P3 extends keyof Translations[P1][P2]
  >(prop1: P1, prop2: P2, prop3: P3): Translations[P1][P2][P3];
}

type TranslationHook = () => {
  locale: Locales;
  location: Location;
  t: Translate;
};

export const useTranslation: TranslationHook = (
  () => {
    const { locale, location, translation } = useContext(TranslationContext);
  
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const t: Translate = (p1: any, p2?: any, p3?: any) => {
      if (p1 && p2 && p3) {
        return (translation as any)[p1][p2][p3];
      }
  
      if (p1 && p2) {
        return (translation as any)[p1][p2];
      }
  
      if (p1) {
        return (translation as any)[p1];
      }
    };
    /* eslint-enable @typescript-eslint/no-explicit-any */

    return { locale, location, t };
  }
);

type Props = { children: (t: Translate) => JSX.Element };
export const Translation = React.memo(({ children }: Props) => {
  const { t } = useTranslation();
  return children(t);
});
