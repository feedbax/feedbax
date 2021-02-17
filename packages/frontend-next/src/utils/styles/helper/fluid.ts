import { between } from 'polished';
import { CSSInterpolation, CSSObject } from '@emotion/serialize';

type Tuple<T, N extends number, R extends unknown[] = []> = (
  R['length'] extends N
    ? R
    : Tuple<T, N, [T, ...R]>
);

type FScreen<Sceen> = Sceen extends string[] ? Narrow<Sceen> : [];
type CreateTuple<T> = T extends any[] ? Tuple<string, T['length']> : Readonly<[]>;
type FCSS<Sceen> = { [prop in keyof CSSObject]: CreateTuple<Narrow<Sceen>> };

export function fluid <Sceen>(screen: FScreen<Sceen>, css: FCSS<Sceen>): CSSInterpolation[];
export function fluid(
  screen: FScreen<['', '']>,
  css: FCSS<['', '']>,
): CSSInterpolation[] {
  if (screen.length <= 1) throw new Error('');

  const fluidRangeObject: CSSInterpolation = [];

  const screenClone = [...screen];
  const maxScreen = screenClone.pop() ?? '';

  const firstStyles: CSSObject = {};
  const cssEntries = Object.entries(css);

  { // eslint-disable-line no-lone-blocks
    // first styles

    for (let i = 0; i < cssEntries.length; i += 1) {
      const [property, styles] = cssEntries[i];
      const [firstStyle] = styles;

      firstStyles[property] = firstStyle;
    }

    fluidRangeObject.push(firstStyles);
  }

  { // eslint-disable-line no-lone-blocks
    // fluid styles

    for (let i = 0; i < screenClone.length; i += 1) {
      const fluidScreen = screen[i];
      const nextScreen = screen[i + 1];

      const fluidStyles: CSSObject = {};

      for (let j = 0; j < cssEntries.length; j += 1) {
        const [property, styles] = cssEntries[j];
        const nthStyle1 = styles[i];
        const nthStyle2 = styles[i + 1];

        fluidStyles[property] = between(nthStyle1, nthStyle2, fluidScreen, nextScreen);
      }

      fluidRangeObject.push({
        [`@media (min-width: ${fluidScreen})`]: fluidStyles,
      });
    }
  }

  { // eslint-disable-line no-lone-blocks
    // last styles

    const lastStyles: CSSObject = {};

    for (let i = 0; i < cssEntries.length; i += 1) {
      const [property, styles] = cssEntries[i];
      const lastStyle = styles.pop();

      lastStyles[property] = lastStyle;
    }

    fluidRangeObject.push({
      [`@media (min-width: ${maxScreen})`]: lastStyles,
    });
  }

  return fluidRangeObject;
}

/**
 * @author Pierre-Antoine Mills
 * @see https://github.com/millsp
 * @see https://github.com/microsoft/TypeScript/issues/30680#issuecomment-752725353
 */

type Narrowable =
  | string
  | number
  | bigint
  | boolean
  | [];

type Narrow<A> =
  | (A extends Narrowable ? A : never)
  | ({ [K in keyof A]: Narrow<A[K]> });
