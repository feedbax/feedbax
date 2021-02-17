import { between } from 'polished';
import { CSSInterpolation } from '@emotion/serialize';

type Tuple<T, N extends number, R extends unknown[] = []> = (
  R['length'] extends N
    ? R
    : Tuple<T, N, [T, ...R]>
);

export function fluidRange <
  Screen extends Readonly<string[]>,
  Sizes extends Readonly<Readonly<Tuple<string, Screen['length']>>[]>,
  Units extends Tuple<string, Sizes['length']>,
>(
  props: {
    screen: Screen,
    sizes: Sizes,
    style: (...units: Units) => CSSInterpolation,
  }
): CSSInterpolation[];

export function fluidRange(props: {
  screen: readonly ['20rem', '120rem'];
  sizes: readonly [readonly ['a', 'b']];
  style: (units_0: string) => CSSInterpolation;
}): CSSInterpolation[] {
  const { screen, sizes } = props;
  const { style } = props;

  const screenArray = [...screen];
  const sizesArray = [...sizes];

  const styles: CSSInterpolation[] = [];
  const maxScreen = screenArray.pop();

  const firsts = sizesArray.map(([first]) => first) as Tuple<string, 1>;
  const lasts = sizesArray.map((size) => [...size].pop()) as Tuple<string, 1>;

  styles.push(
    style(...firsts),
  );

  for (let i = 0; i < screenArray.length; i += 1) {
    const fluidScreen = screen[i];
    const nextScreen = screen[i + 1];

    const fluids = sizesArray.map(
      (size) => between(size[i], size[i + 1], fluidScreen, nextScreen),
    ) as Tuple<string, 1>;

    styles.push({
      [`@media (min-width: ${fluidScreen})`]: style(...fluids),
    });
  }

  styles.push({
    [`@media (min-width: ${maxScreen})`]: style(...lasts),
  });

  return styles;
}
