import React, { useContext } from "react";

import { TranslationContext } from "~i18n";
import type { Translations } from "~i18n/locales";

// prettier-ignore
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

export const useTranslation = () => {
  const { originalPath, locale, translation } = useContext(TranslationContext);

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

  return { originalPath, locale, t };
};

type Props = { children: (t: Translate) => JSX.Element };
export const Translation = React.memo(({ children }: Props) => {
  const { t } = useTranslation();
  return children(t);
});
