import { between } from 'polished';
import type { IStyle } from 'fela';

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

export type FluidRangeObject = {
  base: IStyle;

  medias: {
    [property: string]: IStyle;
  }
};

type FluidRange = {
  <
    Screen extends Readonly<string[]>,
    Sizes extends Readonly<ReadonlyTuple<string, Screen['length']>[]>,
    Units extends Tuple<string, Sizes['length']>,
  > (props: {
      screen: Screen;
      sizes: Sizes;
      css: (units: Units) => IStyle;
    }): FluidRangeObject;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
type FluidAny = {
  screen: any;
  sizes: any;
  css: (units: any) => IStyle;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export const fluidRange: FluidRange = (
  (props: FluidAny) => {
    const fluidRangeObject: FluidRangeObject = {
      base: {},
      medias: {},
    };

    const { screen, css, sizes } = props;

    const $screen = [...screen] as [string];
    const $sizes = [...sizes] as [[string], [string]];

    const maxScreen = $screen.pop() ?? '';

    const firsts = $sizes.map(([first]) => first) as [string, string];
    const lasts = $sizes.map((size) => [...size].pop()) as [string, string];

    fluidRangeObject.base = {
      ...css(firsts),
    };

    for (let i = 0; i < $screen.length; i += 1) {
      const fluidScreen = screen[i];
      const nextScreen = screen[i + 1];

      const fluids = $sizes.map(
        (size) => between(size[i], size[i + 1], fluidScreen, nextScreen),
      ) as [string, string];

      fluidRangeObject.medias = {
        ...fluidRangeObject.medias,

        [`@media (min-width: ${fluidScreen})`]: {
          ...css(fluids),
        },
      };
    }

    fluidRangeObject.medias = {
      ...fluidRangeObject.medias,

      [`@media (min-width: ${maxScreen})`]: {
        ...css(lasts),
      },
    };

    return fluidRangeObject;
  }
);
