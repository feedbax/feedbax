import isCSSShorthand from 'is-css-shorthand';
import { isStyle } from './shared';

import type { IStyle } from 'fela';

export default (
  function checkCSSShorthand (style: IStyle, type: string): IStyle {
    if (type !== 'RULE') return style;

    const $styleEntries = Object.entries(style);

    for (let i = 0; i < $styleEntries.length; i += 1) {
      const [prop, value] = $styleEntries[i];

      if (isCSSShorthand(prop) && process.browser) {
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
