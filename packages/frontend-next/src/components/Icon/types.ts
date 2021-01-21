import type { IStyle } from 'fela';
import type { ColorKeys } from '@/theme/types';

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
  icon?: ColorKeys;
  background?: ColorKeys;
};

export type IconProps = {
  icon: Icons;

  customRule?: IStyle;
  variant?: Variants;
  color?: IconColors;
};
