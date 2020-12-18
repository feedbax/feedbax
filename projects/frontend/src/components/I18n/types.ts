import type { TranslationData } from '~graphql-types';

export type Location = {
  path: string;
  matchPath?: string;
  params: Record<string, string | undefined>;
};

export type Context = {
  translation: TranslationData;
  locale: string;
  locales: string[];
  location: Location;
};

export interface Translate {
  <
    K1 extends keyof NN1<TranslationData>,
    K2 extends keyof (NN1<NN1<TranslationData>[K1]>) = never,
    K3 extends keyof (NN1<NN1<NN1<TranslationData>[K1]>[K2]>) = never,
  >(prop1: K1, prop2?: K2, prop3?: K3): TranslationDataClean<K1, K2, K3>;
}

type NN2<T> = Required<Omit<NonNullable<T>, '__typename'>>;

type NN1<T> = (
  NonNullable<T> extends string
    ? string
    : {
      [K in keyof NN2<T>]-?: (
        NonNullable<NN2<T>[K]>
      )
    }
);

type TranslationDataClean<
  K1 extends keyof NN1<TranslationData>,
  K2 extends keyof (NN1<NN1<TranslationData>[K1]>) = never,
  K3 extends keyof (NN1<NN1<NN1<TranslationData>[K1]>[K2]>) = never,
> = (
  [K2] extends [never]
    ? NN1<NN1<TranslationData>[K1]>
    : [K3] extends [never]
      ? NN1<NN1<NN1<TranslationData>[K1]>[K2]>
      : NN1<NN1<NN1<NN1<TranslationData>[K1]>[K2]>[K3]>
);
