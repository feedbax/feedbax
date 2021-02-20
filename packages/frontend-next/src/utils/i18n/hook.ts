import { useCallback, useContext } from 'react';
import { useRouter } from 'next/router';

type TranslateFunction = {
  <A extends keyof Translation> (a: A): Translation[A];

  <
    A extends keyof Translation,
    B extends keyof Translation[A],
  > (a: A, b: B): Translation[A][B];

  <
    A extends keyof Translation,
    B extends keyof Translation[A],
    C extends keyof Translation[A][B],
  > (a: A, b: B, c: C): Translation[A][B][C];
};

type TranslationHook = {
  t: TranslateFunction;
  locale: string;
  locales: string[];
  distinctLocales: string[];
};

export function useTranslation(): TranslationHook {
  let translation: Translation;
  const { locale, locales } = useRouter();

  if (process.browser) {
    translation = (window as any).translation ?? {};
  } else {
    translation = require(`@/utils/i18n/locales/${locale}/__generated/translation.json`);
  }

  const t = useCallback(
    (a: string, b?: string, c?: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const translationAny = translation as any;

      if (typeof a === 'undefined') return translationAny;
      if (typeof b === 'undefined') return translationAny[a];
      if (typeof c === 'undefined') return translationAny[a][b];

      return translationAny[a][b][c];
    },

    [translation],
  );

  if (typeof locale === 'undefined') throw new Error('locale is undefined');
  if (typeof locales === 'undefined') throw new Error('locales is undefined');

  const distinctLocales = locales.filter(($locale) => $locale !== locale);

  return {
    t,
    locale,
    locales,
    distinctLocales,
  };
}
