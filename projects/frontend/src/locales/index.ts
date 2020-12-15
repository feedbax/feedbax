import de from './de';
import en from './en';
import it from './it';
import pl from './pl';
import hr from './hr';

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

// eslint-disable-next-line object-curly-newline
export const translations = { de, en, it, pl, hr };

export const locales = Object.keys(translations).sort();
export const defaultLocale = 'de';

export type Locales = typeof locales[number];
export type Translations = typeof translations[Locales];
