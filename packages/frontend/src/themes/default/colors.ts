import { shade, tint } from 'polished';
import type { Colors } from '~themes/types';

const colors: Colors = {
  '--color-feedbax-primary': '#3a5568',
  '--color-feedbax-secondary': '#ff7d65',

  '--color-black-100': shade(1.00, '#fff'),
  '--color-black-95': shade(0.95, '#fff'),
  '--color-black-90': shade(0.90, '#fff'),
  '--color-black-85': shade(0.85, '#fff'),
  '--color-black-80': shade(0.80, '#fff'),

  '--color-white-100': tint(1.00, '#000'),
  '--color-white-95': tint(0.95, '#000'),
  '--color-white-90': tint(0.90, '#000'),
  '--color-white-85': tint(0.85, '#000'),
  '--color-white-80': tint(0.80, '#000'),

  '--color-transparent': [
    '#ffffff00',
    'rgba(0, 0, 0, 0)',
    'transparent',
  ],

  '--color-primary-text': 'var(--color-white-100)',
  '--color-background-footer': 'var(--color-black-90)',
};

export default colors;
