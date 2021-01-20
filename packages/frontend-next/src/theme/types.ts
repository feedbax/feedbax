export type Value = string | string[];

export interface Fonts {
  '--font-feedbax-primary': Value;
  '--font-feedbax-secondary': Value;
  '--font-feedbax-tertiary': Value;
}

export interface Colors {
  '--color-feedbax-primary': Value;
  '--color-feedbax-secondary': Value;

  '--color-black-100': Value;
  '--color-black-95': Value;
  '--color-black-90': Value;
  '--color-black-85': Value;
  '--color-black-80': Value;

  '--color-white-100': Value;
  '--color-white-95': Value;
  '--color-white-90': Value;
  '--color-white-85': Value;
  '--color-white-80': Value;

  '--color-transparent': Value;
  '--color-primary-text': Value;
  '--color-background-footer': Value;
}

export interface Theme extends Fonts, Colors {}

export type ColorKeys = keyof Colors;
export type FontKeys = keyof Fonts;

export type ThemeKeys = keyof Theme;
