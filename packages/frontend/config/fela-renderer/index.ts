import merge from 'lodash.merge';
import isCSSShorthand from 'is-css-shorthand';

import prefixer from 'fela-plugin-prefixer';
import fallbackValue from 'fela-plugin-fallback-value';

import type { FelaRule } from '~lib/css-helper/fela';

const isStyle = (
  (val: unknown): val is FelaRule => (
    val != null
      && typeof val === 'object'
      && Array.isArray(val) === false
  )
);

const checkCSSShorthand = (
  (style: FelaRule): FelaRule => {
    const $styleEntries = Object.entries(style);

    for (let i = 0; i < $styleEntries.length; i += 1) {
      const [prop, value] = $styleEntries[i];

      if (isCSSShorthand(prop)) {
        // eslint-disable-next-line no-console
        console.debug('css shorthand found', prop, value);
      }

      if (isStyle(value)) {
        checkCSSShorthand(value);
      }
    }

    return style;
  }
);

const fluidRange = (
  (style: FelaRule): FelaRule => {
    let $style = style;
    const $styleEntries = Object.entries($style);

    for (let i = 0; i < $styleEntries.length; i += 1) {
      const [prop, value] = $styleEntries[i];

      if (prop === 'fluidRange') {
        const $value = value as NonNullable<FelaRule['fluidRange']>;
        const $medias = Object.entries($value.medias);

        $style = merge($style, fluidRange($value.base));

        for (let j = 0; j < $medias.length; j += 1) {
          const [$mediaQuery, $mediaContent] = $medias[j];

          $style = merge($style, {
            [$mediaQuery]: fluidRange($mediaContent),
          });
        }

        delete $style.fluidRange;
      }
    }

    return $style;
  }
);

const nested = (
  (style: FelaRule): FelaRule => {
    let $style = style;
    const $styleEntries = Object.entries($style);

    for (let i = 0; i < $styleEntries.length; i += 1) {
      const [prop, value] = $styleEntries[i];

      if (prop === 'nested' && isStyle(value)) {
        $style = merge($style, nested(value));
        delete $style.nested;
      } else if (isStyle(value)) {
        $style = merge($style, {
          [prop]: nested(value),
        });
      }
    }

    return $style;
  }
);

const _log = (
  (message: string) => (
    (style: FelaRule): FelaRule => {
      // eslint-disable-next-line no-console
      console.debug(message, JSON.stringify(style, null, 2));
      return style;
    }
  )
);

export default {
  plugins: [
    fluidRange,
    nested,

    prefixer(),
    fallbackValue(),

    checkCSSShorthand,
  ],
};
