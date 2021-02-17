import type { ThemeColorKeys } from '@/utils/theme/types';
import type { Interpolation, Theme } from '@emotion/react';

export enum Icons {
  Heart,
  Exit,
  Clock,
  Person,
  Menu,
  Close,
  ArrowBack,
  Language,
}

export enum Variants {
  None,
  Filled,
  Outline,
}

export type IconColors = {
  icon?: ThemeColorKeys;
  background?: ThemeColorKeys;
};

export type IconProps = {
  icon: Icons;

  ccss?: Interpolation<Theme>;
  variant?: Variants;
  color?: IconColors;
};
