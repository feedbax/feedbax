import merge from 'lodash.merge';
import { isStyle } from './shared';

import type { IStyle } from 'fela';
import type { FluidRangeObject } from '@/styles/helper/fluid-range';

export default (
  function fluidRange (style: IStyle): IStyle {
    let $style = style;
    const $styleEntries = Object.entries($style);

    for (let i = 0; i < $styleEntries.length; i += 1) {
      const [prop, value] = $styleEntries[i];

      if (prop === 'fluidRange') {
        const $value = value as FluidRangeObject;
        const $medias = Object.entries($value.medias);

        $style = merge($style, fluidRange($value.base));

        for (let j = 0; j < $medias.length; j += 1) {
          const [$mediaQuery, $mediaContent] = $medias[j];

          $style = merge($style, {
            [$mediaQuery]: fluidRange($mediaContent),
          });
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete ($style as any).fluidRange;
      } else if (isStyle(value)) {
        $style = merge($style, {
          [prop]: fluidRange(value),
        });
      }
    }

    return $style;
  }
);
