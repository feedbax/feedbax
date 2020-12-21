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
  css: CSSPropFn,
};

const fluidRange = (
  <
    Screen extends ScreenType,
    Sizes extends SizesType<Screen>,
    CSSPropFn extends CSSPropFnType<Sizes['length']>,
  > (props: Props<Screen, Sizes, CSSPropFn>): SerializedStyles => {
    const { screen, css: _css, sizes } = props;

    const _screen = [...screen];
    const _sizes = [...sizes];

    const maxScreen = _screen.pop() ?? '';
    const styles: SerializedStyles[] = [];

    const froms = _sizes.map(([from]) => from) as ReadonlyStringTuple<Sizes['length']>;
    const tos = _sizes.map(([_from, to]) => to) as ReadonlyStringTuple<Sizes['length']>;

    styles.push(
      css`
        ${_css(froms)}

        @media (min-width: ${maxScreen}) {
          ${_css(tos)}
        }
      `,
    );

    for (let i = 0; i < _screen.length; i += 1) {
      const fluidScreen = screen[i];
      const nextScreen = screen[i + 1];

      const fluids = _sizes.map(
        (size) => between(size[i], size[i + 1], fluidScreen, nextScreen),
      ) as ReadonlyStringTuple<Sizes['length']>;

      styles.push(
        css`
          @media (min-width: ${fluidScreen}) {
            ${_css(fluids)}
          }
        `,
      );
    }

    return css(styles);
  }
);

export default fluidRange;
