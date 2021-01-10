import type { FelaRule } from '~lib/css-helper/fela';
import type { ColorKeys } from '~themes/types';

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

  customRule?: FelaRule;
  variant?: Variants;
  color?: IconColors;
};
