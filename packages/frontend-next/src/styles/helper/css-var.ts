import type { Theme } from '@/theme/types';

export const cssVar = (
  <T extends keyof Theme> (cssVariable: T): string => (
    `var(${cssVariable})`
  )
);
