import type React from 'react';
import type { CSSInterpolation } from '@emotion/serialize';
import type { Colors } from '~theme';

export enum Icons {
  Heart,
  Exit,
  Clock,
  Person,
  Menu,
  Close,
  ArrowBack,
}

export enum Variants {
  None,
  Filled,
  Outline,
}

export type IconButtonColors = {
  icon?: Colors;
  background?: Colors;
};

export type IconButtonProps = {
  ariaLabel: string;

  icon: Icons;
  variant?: Variants;

  size?: number
  sizeBounds?: { min?: number, max?: number };

  neumorphism?: boolean;
  color?: IconButtonColors;

  styles?: CSSInterpolation;

  to?: string;
  onClick?: (event: React.MouseEvent<unknown, MouseEvent>) => void;

  setFocus?: boolean;
};
