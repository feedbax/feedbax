import { css } from '@emotion/react';
import { between } from 'polished';

import type { CSSInterpolation, SerializedStyles } from '@emotion/serialize';

type ReadonlyTuple<T, N extends number, R extends unknown[]> = (
  R['length'] extends N
    ? Readonly<R>
    : ReadonlyTuple<T, N, [T, ...R]>
);

type ReadonlyStringTuple<N extends number> = ReadonlyTuple<string, N, []>;
type GetArrayType<T> = T extends Array<infer R> ? R : T;

type Tuples = [
  ReadonlyStringTuple<2>,
  ReadonlyStringTuple<3>,
  ReadonlyStringTuple<4>,
  ReadonlyStringTuple<5>,
];

type ScreenType = GetArrayType<Tuples>;
type SizesType<T extends ScreenType> = (
  T extends Tuples[0]
    ? readonly (Tuples[0])[]
    : T extends Tuples[1]
      ? readonly (Tuples[1])[]
      : T extends Tuples[2]
        ? readonly (Tuples[2])[]
        : T extends Tuples[3]
          ? readonly (Tuples[3])[]
          : never
);

type CSSPropFnType<N extends number> = (
  (units: ReadonlyStringTuple<N>) => CSSInterpolation
);

type Props<
  Screen extends ScreenType,
  Sizes extends SizesType<Screen>,
  CSSPropFn extends CSSPropFnType<Sizes['length']>,
> = {
  sizes: Sizes,
  screen: Screen,
  screenProp?: string;
  css: CSSPropFn,
};

const mediaProp = (
  (screenProp: string, size: string): string => (
    `${screenProp}: ${size}`
  )
);

const cssMuted: typeof css = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: any[]) => {
    const style = css(...args);
    style.name = '';

    return style;
  }
);

const fluidRange = (
  <
    Screen extends ScreenType,
    Sizes extends SizesType<Screen>,
    CSSPropFn extends CSSPropFnType<Sizes['length']>,
  > (props: Props<Screen, Sizes, CSSPropFn>): SerializedStyles => {
    const { screen, css: _css, sizes } = props;
    const { screenProp = 'min-width' } = props;

    const _screen = [...screen];
    const _sizes = [...sizes];

    const styles: SerializedStyles[] = [];

    const maxScreen = _screen.pop() ?? '';

    const firsts = _sizes.map(([first]) => first) as ReadonlyStringTuple<Sizes['length']>;
    const lasts = _sizes.map((size) => [...size].pop()) as ReadonlyStringTuple<Sizes['length']>;

    styles.push(
      cssMuted`
        ${_css(firsts)}
      `,
    );

    for (let i = 0; i < _screen.length; i += 1) {
      const fluidScreen = screen[i];
      const nextScreen = screen[i + 1];

      const fluids = _sizes.map(
        (size) => between(size[i], size[i + 1], fluidScreen, nextScreen),
      ) as ReadonlyStringTuple<Sizes['length']>;

      styles.push(
        cssMuted`
          @media (${mediaProp(screenProp, fluidScreen)}) {
            ${_css(fluids)}
          }
        `,
      );
    }

    styles.push(
      cssMuted`
        @media (${mediaProp(screenProp, maxScreen)}) {
          ${_css(lasts)}
        }
      `,
    );

    return cssMuted(styles);
  }
);

export default fluidRange;
