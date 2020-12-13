import type { Locales, Translations } from '~locales';

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

export interface Translate {
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
