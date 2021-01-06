import type { Colors } from '~theme';

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
  icon?: Colors;
  background?: Colors;
};

export type IconProps = {
  icon: Icons;
  variant?: Variants;
  color?: IconColors;
};
