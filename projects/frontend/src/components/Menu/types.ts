import type { CSSInterpolation } from '@emotion/serialize';

export type MenuItem = {
  key: string;
  styles?: CSSInterpolation;

  content: string | React.ReactNode;
  items?: MenuItem[];
};
