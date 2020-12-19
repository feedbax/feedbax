import type { TranslationData } from '~graphql-types';

type RequiredGraphql<T> = (
  T extends string
    ? string
    : T extends number
      ? number
      : T extends boolean
        ? boolean
        : {
          [K in keyof Omit<T, '__typename'>]-?: (
            RequiredGraphql<NonNullable<T[K]>>
          )
        }
)

export type TranslationDataClean = (
  RequiredGraphql<TranslationData>
);

export type Location = {
  path: string;
  matchPath?: string;
  params: Record<string, string | undefined>;
};

export type Context = {
  translation: TranslationDataClean;
  locale: string;
  locales: string[];
  location: Location;
};

export interface Translate {
  (): TranslationDataClean;

  <
    K1 extends keyof (TranslationDataClean),
  >(prop1: K1): TranslationDataClean[K1];

  <
    K1 extends keyof (TranslationDataClean),
    K2 extends keyof (TranslationDataClean[K1]),
  >(prop1: K1, prop2: K2): TranslationDataClean[K1][K2];

  <
    K1 extends keyof (TranslationDataClean),
    K2 extends keyof (TranslationDataClean[K1]),
    K3 extends keyof (TranslationDataClean[K1][K2]),
  >(prop1: K1, prop2: K2, prop3: K3): TranslationDataClean[K1][K2][K3];
}
