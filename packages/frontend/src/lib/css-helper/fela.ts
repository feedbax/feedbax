import { between } from 'polished';

type IStyle = import('fela').IStyle;

export type FluidRangeObject = {
  base: FelaRule;

  medias: {
    [property: string]: FelaRule;
  }
};

export type FelaRule = IStyle & {
  fluidRange?: FluidRangeObject;

  nested?: {
    [property: string]: FelaRule;
  };

  variables?: {
    [property: string]: string | string[];
  }
};

export const createRule = (
  <T extends FelaRule> (rule: T): FelaRule => rule
);

/* eslint-disable @typescript-eslint/indent */

type Tuple<T, N extends number, R extends unknown[] = []> = (
  R['length'] extends N
    ? R
    : Tuple<T, N, [T, ...R]>
);

type ReadonlyTuple<T, N extends number, R extends unknown[] = []> = (
  R['length'] extends N
    ? Readonly<R>
    : ReadonlyTuple<T, N, [T, ...R]>
);

type FluidRange = {
  <
    Screen extends Readonly<string[]>,
    Sizes extends Readonly<ReadonlyTuple<string, Screen['length']>[]>,
    Units extends Tuple<string, Sizes['length']>,
  > (props: {
      screen: Screen;
      sizes: Sizes;
      css: (units: Units) => FelaRule;
    }): FluidRangeObject;
};

export const fluidRange: FluidRange = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: any) => {
      const fluidRangeObject: FluidRangeObject = {
        base: {},
        medias: {},
      };

      const { screen, css: _css, sizes } = props;

      const _screen = [...screen] as [string];
      const _sizes = [...sizes] as [[string], [string]];

      const maxScreen = _screen.pop() ?? '';

      const firsts = _sizes.map(([first]) => first) as [string, string];
      const lasts = _sizes.map((size) => [...size].pop()) as [string, string];

      fluidRangeObject.base = {
        ..._css(firsts),
      };

      for (let i = 0; i < _screen.length; i += 1) {
        const fluidScreen = screen[i];
        const nextScreen = screen[i + 1];

        const fluids = _sizes.map(
          (size) => between(size[i], size[i + 1], fluidScreen, nextScreen),
        ) as [string, string];

        fluidRangeObject.medias = {
          ...fluidRangeObject.medias,

          [`@media (min-width: ${fluidScreen})`]: {
            ..._css(fluids),
          },
        };
      }

      fluidRangeObject.medias = {
        ...fluidRangeObject.medias,

        [`@media (min-width: ${maxScreen})`]: {
          ..._css(lasts),
        },
      };

      return fluidRangeObject;
    }
);
