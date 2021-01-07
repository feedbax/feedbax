import renderer from '~themes/renderer';
import { createRule } from '~lib/css-helper';

import fonts from './fonts';
import colors from './colors';

import type { Theme } from '~themes/types';

const theme: Theme = {
  ...colors,
  ...fonts,
};

renderer.renderStatic(
  createRule({
    variables: {
      ...theme,
    },
  }),

  'html[current-theme="default"]',
);
