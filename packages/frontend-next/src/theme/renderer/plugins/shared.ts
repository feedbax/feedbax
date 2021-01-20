import type { IStyle } from 'fela';

export const isStyle = (
  (val: unknown): val is IStyle => (
    val != null
      && typeof val === 'object'
      && Array.isArray(val) === false
  )
);
