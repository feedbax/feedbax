import type React from 'react';
import type { CSSInterpolation } from '@emotion/serialize';
import type { Colors } from '~theme';
import type { IconProps } from '~components/Icon';

export type IconButtonColors = {
  icon?: Colors;
  background?: Colors;
};

export type IconButtonProps = IconProps & {
  ariaLabel: string;

  size?: number
  sizeBounds?: { min?: number, max?: number };

  neumorphism?: boolean;
  styles?: CSSInterpolation;

  to?: string;
  onClick?: (event: React.MouseEvent<unknown, MouseEvent>) => void;

  setFocus?: boolean;
};
