import de from './de';
import en from './en';
import _locales from './locales.json';

type ObjectKeys<T> =
  T extends Record<string, unknown> ? (keyof T)[]:
  T extends number ? [] :
  T extends Array<unknown> | string ? string[] :
  never;

declare global {
  interface ObjectConstructor {
    keys<T>(o: T): ObjectKeys<T>;
  }
}

export const translations = {
  de: {
    ...de,
    locales: _locales,
  },

  en: {
    ...en,
    locales: _locales,
  },
};

export const locales = Object.keys(translations);
export const defaultLocale = 'de';

export type Locales = typeof locales[number];
export type Translations = typeof translations[Locales];