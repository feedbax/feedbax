import type { Theme } from '~themes/types';

const cssVar = (
  <T extends keyof Theme> (cssVariable: T): string => (
    `var(${cssVariable})`
  )
);

export default cssVar;
