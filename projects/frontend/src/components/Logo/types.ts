import type { CSSInterpolation } from '@emotion/serialize';

export type Variant = 'text' | 'no-text' | 'no-shadow-and-text';

export type LogoProps = {
  styles?: CSSInterpolation;
  variant?: Variant;
  link?: string;
};
