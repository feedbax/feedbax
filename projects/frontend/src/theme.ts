import { shade, tint } from 'polished';
import type { CSSInterpolation } from '@emotion/serialize';

const fonts = {
  '--font-feedbax-primary': 'Klinic Slab',
  '--font-feedbax-secondary': 'Roboto Slab',
  '--font-feedbax-tertiary': 'Klinic Slab Book',
};

const colors = {
  '--color-feedbax-primary': '#3a5568',
  '--color-feedbax-secondary': '#ff7d65',

  '--black-100': shade(1.00, '#fff'),
  '--black-95': shade(0.95, '#fff'),
  '--black-90': shade(0.90, '#fff'),
  '--black-85': shade(0.85, '#fff'),
  '--black-80': shade(0.80, '#fff'),

  '--white-100': tint(1.00, '#000'),
  '--white-95': tint(0.95, '#000'),
  '--white-90': tint(0.90, '#000'),
  '--white-85': tint(0.85, '#000'),
  '--white-80': tint(0.80, '#000'),

  '--transparent': [
    '#ffffff00',
    'rgba(0, 0, 0, 0)',
    'transparent',
  ],

  get '--color-primary-text' () {
    return 'var(--white-100)';
  },

  get '--color-background-footer' () {
    return 'var(--black-90)';
  },
};

const themeDefault = {
  ...colors,
  ...fonts,
};

export const themes: CSSInterpolation = {
  'html.theme-default': themeDefault,
};

export type Theme = typeof themeDefault;
export type Colors = keyof typeof colors;
