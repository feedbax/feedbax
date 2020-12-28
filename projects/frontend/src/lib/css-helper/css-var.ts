import type { Theme } from '~theme';

const cssVar = (
  <T extends keyof Theme> (cssVariable: T): string => (
    `var(${cssVariable})`
  )
);

export default cssVar;
