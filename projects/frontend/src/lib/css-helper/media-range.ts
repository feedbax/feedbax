/*

mediaRange({
  screen: [320, 2560],
  size: [10, 20],
  css: (unit) => ({
    width: `${unit}px`
  }),
})

output

*/

import { css } from '@emotion/react';
import { CSSInterpolation, SerializedStyles } from '@emotion/serialize';

type Size = [number, number];

type MediaRangePropsSingle = {
  size: Size;
  css: (unit: number) => CSSInterpolation;
  screen: [number, number];
  points?: number;
};

type MediaRangePropsMultiple = {
  sizes: Array<Size>;
  css: (units: Array<number>) => CSSInterpolation;
  screen: [number, number];
  points?: number;
};

type MediaRange = {
  (props: MediaRangePropsSingle): SerializedStyles;
  (props: MediaRangePropsMultiple): SerializedStyles;
};

const toFixed = (
  (number: number, precision: number): number => (
    Math.round((number + Number.EPSILON) * (10 ** precision)) / (10 ** precision)
  )
);

const mediaRange: MediaRange = (
  (props: MediaRangePropsSingle | MediaRangePropsMultiple) => {
    const styles: CSSInterpolation[] = [];

    const { points = 12 } = props;

    const { screen } = props;
    const [screenMin, screenMax] = screen;

    const deltaScreen = screenMax - screenMin;
    const stepsScreen = deltaScreen / points;

    if ('sizes' in props) {
      const { css: _css, sizes } = props;

      const sizesMin = sizes.map(([min, _max]) => min);
      const sizesMax = sizes.map(([_min, max]) => max);

      styles.push({
        [`@media only screen 
            and (max-width: ${screenMin}px)`]: _css(sizesMin),
      });

      styles.push({
        [`@media only screen 
            and (min-width: ${screenMax}px)`]: _css(sizesMax),
      });

      for (let i = 0; i < points; i += 1) {
        const percent = (i + 1) / points;

        const _screenMin = toFixed(screenMin + i * stepsScreen, 2);
        const _screenMax = toFixed(screenMin + (i + 1) * stepsScreen, 2);
        const _units = sizes.map(
          ([sizeMin, sizeMax]) => {
            const deltaSize = sizeMax - sizeMin;
            const stepsSize = deltaSize / points;

            return toFixed(sizeMin + (i + percent) * stepsSize, 2);
          },
        );

        const _styles = _css(_units);

        styles.push({
          [`@media only screen 
              and (min-width: ${_screenMin}px)
              and (max-width: ${_screenMax}px)`]: _styles,
        });
      }
    }

    if ('size' in props) {
      const { css: _css, size } = props;
      const [sizeMin, sizeMax] = size;

      const deltaSize = sizeMax - sizeMin;
      const stepsSize = deltaSize / points;

      styles.push({
        [`@media only screen 
          and (max-width: ${screenMin}px)`]: _css(sizeMin),
      });

      styles.push({
        [`@media only screen 
          and (min-width: ${screenMax}px)`]: _css(sizeMax),
      });

      for (let i = 0; i < points; i += 1) {
        const percent = (i + 1) / points;

        const _screenMin = toFixed(screenMin + i * stepsScreen, 2);
        const _screenMax = toFixed(screenMin + (i + 1) * stepsScreen, 2);
        const _unit = toFixed(sizeMin + (i + percent) * stepsSize, 2);

        const _styles = _css(_unit);

        styles.push({
          [`@media only screen 
            and (min-width: ${_screenMin}px)
            and (max-width: ${_screenMax}px)`]: _styles,
        });
      }
    }

    return css(styles);
  }
);

export default mediaRange;
