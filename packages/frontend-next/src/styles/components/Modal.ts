import { createRule, cssVar } from '@/styles/helper';
import type { IStyle } from 'fela';

export type BackdropProps = { isClickable?: boolean };
export type BackdropRule = (props: BackdropProps) => IStyle;

const portal = createRule({
  position: 'fixed',
  overflow: 'hidden',

  width: '100%',
  height: ['100vh', 'calc(var(--vh, 1vh) * 100)'],

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',

  left: '0',
  top: '0',

  zIndex: 9999,
});

const backdrop = (
  ({ isClickable }: BackdropProps): IStyle => createRule({
    cursor: isClickable ? 'pointer' : 'auto',
  })
);

const background = createRule({
  position: 'absolute',
  zIndex: -1,

  backgroundColor: cssVar('--color-feedbax-primary'),
  opacity: 0.8,

  left: '0',
  top: '0',

  width: '100%',
  height: '100%',
});

export const rules = {
  portal,
  backdrop,
  background,
};
