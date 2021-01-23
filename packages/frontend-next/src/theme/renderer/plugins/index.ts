import fluidRange from './fluid-range';
import checkCSSShorthand from './check-css-shorthand';

import prefixer from 'fela-plugin-prefixer';
import fallbackValue from 'fela-plugin-fallback-value';

import type { TPlugin } from 'fela';

export default [
  fluidRange,

  prefixer(),
  fallbackValue(),

  checkCSSShorthand,
] as TPlugin[];
