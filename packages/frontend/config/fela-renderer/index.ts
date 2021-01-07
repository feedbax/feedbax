import merge from 'lodash.merge';
import isCSSShorthand from 'is-css-shorthand';

import prefixer from 'fela-plugin-prefixer';
import fallbackValue from 'fela-plugin-fallback-value';

import type { FelaRule } from '~lib/css-helper/fela';
import type { TPlugin } from 'fela';

const isStyle = (
  (val: unknown): val is FelaRule => (
    val != null
      && typeof val === 'object'
      && Array.isArray(val) === false
  )
);

const checkCSSShorthand: TPlugin = (
  (style: FelaRule, type): FelaRule => {
    if (type !== 'RULE') return style;

    const $styleEntries = Object.entries(style);

    for (let i = 0; i < $styleEntries.length; i += 1) {
      const [prop, value] = $styleEntries[i];

      if (isCSSShorthand(prop)) {
        try {
          throw new Error(`css shorthand found ${prop} ${value}`);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.warn(error);
        }
      }

      if (isStyle(value)) {
        checkCSSShorthand(value, type);
      }
    }

    return style;
  }
);

const fluidRange: TPlugin = (
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
      } else if (isStyle(value)) {
        $style = merge($style, {
          [prop]: fluidRange(value),
        });
      }
    }

    return $style;
  }
);

const nested: TPlugin = (
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

const variables: TPlugin = (
  (style: FelaRule): FelaRule => {
    let $style = style;
    const $styleEntries = Object.entries($style);

    for (let i = 0; i < $styleEntries.length; i += 1) {
      const [prop, value] = $styleEntries[i];

      if (prop === 'variables' && isStyle(value)) {
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
    variables,

    prefixer(),
    fallbackValue(),

    checkCSSShorthand,
  ],
};
