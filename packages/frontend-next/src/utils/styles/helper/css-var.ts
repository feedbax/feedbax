import type { ThemeKeys } from '@/utils/theme/types';

export const cssVar = (
  <T extends ThemeKeys> (cssVariable: T): string => (
    `var(${cssVariable})`
  )
);
