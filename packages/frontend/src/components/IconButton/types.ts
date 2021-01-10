import type React from 'react';
import type { ColorKeys } from '~themes/types';
import type { IconProps } from '~components/Icon';
import type { FelaRule } from '~lib/css-helper/fela';

export type IconButtonColors = {
  icon?: ColorKeys;
  background?: ColorKeys;
};

export type IconButtonProps = IconProps & {
  ariaLabel: string;

  size?: number
  sizeBounds?: { min?: number, max?: number };

  neumorphism?: boolean;
  customRule?: FelaRule;

  to?: string;
  onClick?: (event: React.MouseEvent<unknown, MouseEvent>) => void;

  setFocus?: boolean;
};
