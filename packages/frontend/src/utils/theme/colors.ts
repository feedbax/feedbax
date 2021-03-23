import { shade, tint } from 'polished';

const colorFeedbaxPrimary = '#3a5568';
const colorFeedbaxSecondary = '#ff7d65';

export const colors = {
  '--color-feedbax-primary': colorFeedbaxPrimary,
  '--color-feedbax-primary-shade-20': shade(0.20, colorFeedbaxPrimary),

  '--color-feedbax-secondary': colorFeedbaxSecondary,
  '--color-feedbax-secondary-shade-20': shade(0.20, colorFeedbaxSecondary),

  '--color-transparent': 'transparent',
  '--color-primary-text': tint(1.00, '#000'),
  '--color-background-footer': shade(0.90, '#fff'),
};
