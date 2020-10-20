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
