import type { colors, fonts, themeStyles } from './index';

export type Colors = typeof colors;
export type Fonts = typeof fonts;
export type ThemeStyles = typeof themeStyles;

export type ThemeColorKeys = keyof Colors;
export type ThemeFontKeys = keyof Fonts;
export type ThemeKeys = keyof ThemeStyles[':root'];
