import de from "~i18n/locales/de";
import en from "~i18n/locales/en";
import _locales from "~i18n/locales/locales.json";

type ObjectKeys<T> = 
  T extends object ? (keyof T)[]:
  T extends number ? [] :
  T extends Array<any> | string ? string[] :
  never;

declare global {
  namespace globalThis {
    interface ObjectConstructor {
      keys<T>(o: T): ObjectKeys<T>
    }
  }
}

export const translations = {
  de: {
    ...de,
    locales: _locales
  },

  en: {
    ...en,
    locales: _locales
  }
};

export const locales = Object.keys(translations);
export const defaultLocale = "de";

export type Locales = typeof locales[number];
export type Translations = typeof translations[Locales];
