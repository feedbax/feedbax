type TranslationData = import('~types/translation').Data;

export type Context = {
  translation: TranslationData;
  locale: string;
  locales: string[];
};

export interface Translate {
  (): TranslationData;

  <
    K1 extends keyof (TranslationData),
  >(prop1: K1): TranslationData[K1];

  <
    K1 extends keyof (TranslationData),
    K2 extends keyof (TranslationData[K1]),
  >(prop1: K1, prop2: K2): TranslationData[K1][K2];

  <
    K1 extends keyof (TranslationData),
    K2 extends keyof (TranslationData[K1]),
    K3 extends keyof (TranslationData[K1][K2]),
  >(prop1: K1, prop2: K2, prop3: K3): TranslationData[K1][K2][K3];
}
