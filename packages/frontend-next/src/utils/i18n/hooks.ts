import { useContext, useState } from 'react';
import { useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

import { TranslationContext } from './context';

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

  <
    A extends keyof Translation,
    B extends keyof Translation[A],
    C extends keyof Translation[A][B],
    D extends keyof Translation[A][B][C],
  > (a: A, b: B, c: C, d: D): Translation[A][B][C][D];
};

type TranslationHook = {
  t: TranslateFunction;
  locale: string;
  locales: string[];
  distinctLocales: string[];
};

const loadTranslationData = (
  (locale: string, load: (translation: Translation) => void): void => {  
    console.log('loadTranslationData', locale);

    import(`@/utils/i18n/locales/${locale}/__generated/translation.json`)
      .then(({ default: json }) => load(json));
   }
);

function useDefaultTranslationData(locale: string): Translation {
  let defaultTranslation: Translation;

  if (process.browser) {
    defaultTranslation = (window as any).translation;
  } else {
    defaultTranslation = require(`@/utils/i18n/locales/${locale}/__generated/translation.json`);
  }

  return defaultTranslation;
}

export function useTranslationData(locale?: string) {
  if (typeof locale === 'undefined') throw new Error('locale is undefined');

  const defaultTranslation = useDefaultTranslationData(locale);
  const [translation, setTranslation] = useState<Translation>(defaultTranslation);

  useEffect(
    () => loadTranslationData(locale, setTranslation),
    [locale],
  );

  return translation;
}

export function useTranslation(): TranslationHook {  
  const { locale, locales } = useRouter();
  const translation = useContext(TranslationContext);

  if (typeof locale === 'undefined') throw new Error('locale is undefined');
  if (typeof locales === 'undefined') throw new Error('locales is undefined');

  const translate = useCallback(
    (...args: string[]) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let translationAny = translation as any;

        for (let i = 0; i < args.length; i++) {
          const arg = args[i];
          translationAny = translationAny[arg];
        }

        return translationAny;
      } catch (error) {
        console.warn(error);
      }
    },

    [translation],
  );

  const distinctLocales = useMemo(
    () => locales.filter(($locale) => $locale !== locale),
    [locale, locales]
  );

  return {
    locale,
    locales,
    distinctLocales,
    t: translate,
  };
}