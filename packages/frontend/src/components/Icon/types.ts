import type { ClassNames as ThemeColorKeys } from '@/styles/theme/colors/_export.scss';

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

  className?: string;
  variant?: Variants;
  color?: IconColors;
};
