import fluidRange from './fluid-range';
import checkCSSShorthand from './check-css-shorthand';

import prefixer from 'fela-plugin-prefixer';
import fallbackValue from 'fela-plugin-fallback-value';

import type { TPlugin, IStyle } from 'fela';

const _log = (
  (message: string) => (
    (style: IStyle): IStyle => {
      // eslint-disable-next-line no-console
      console.debug(message, JSON.stringify(style, null, 2));
      return style;
    }
  )
);

export default [
  fluidRange,

  prefixer(),
  fallbackValue(),

  checkCSSShorthand,
] as TPlugin[];
