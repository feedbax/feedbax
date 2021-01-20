import { renderer } from '@/theme/renderer';
import { createRule } from '@/styles/helper';

import fonts from './fonts';
import colors from './colors';

import type { Theme } from '@/theme/types';

const theme: Theme = {
  ...colors,
  ...fonts,
};

renderer.renderStatic(
  createRule({
    ...theme,
  }),

  'html[current-theme="default"]',
);
