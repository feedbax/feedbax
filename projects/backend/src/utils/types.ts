export type PickPartial<T, K extends keyof T> = (
  Pick<T, Exclude<keyof T, K>> & Partial<Pick<T, K>>
);

export type DeepRequired<T> = (
  T extends Record<string, any>
    ? {
      [P in keyof T]-?: NonNullable<T[P]> extends Record<string, any>
        ? DeepRequired<NonNullable<T[P]>>
        : NonNullable<T[P]>;
    }

    : T
);

export type PPartial<
  T extends Record<string, any>,
  K extends Record<string, any>,
> = (
  Omit<T, keyof K>
  &
  {
    [P in keyof K]?: ( // keyof K = 'answers'
      P extends keyof T // keyof T = 'answers' | ..
        ? T[P] extends Array<any>
          ? PPartial<T[P][0], K[P]>[]
          : T[P] extends Record<string, any>
            ? PPartial<T[P], K[P]>
            : T[P]
        : never
    )
  }
);

export type RequireDeep<
  T extends Record<string, any>,
  K extends Record<string, any>,
> = T & ({
  [P in keyof K]-?: (
    P extends keyof T ? (
      T[P] extends Record<string, any> ? (
        K[P] extends Record<string, any> ? (
          RequireDeep<T[P], K[P]>
        ) : NonNullable<T[P]>
      ) : NonNullable<T[P]>
    ) : never
  );
});
