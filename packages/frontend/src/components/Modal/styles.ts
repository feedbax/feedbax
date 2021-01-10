import { cssVar, createRule } from '~lib/css-helper';
import { FelaRule } from '~lib/css-helper/fela';

export type BackdropProps = { isClickable?: boolean };
export type BackdropRule = (props: BackdropProps) => FelaRule;

export const rules = {
  portal: createRule({
    position: 'fixed',
    overflow: 'hidden',

    width: '100%',
    height: ['100vh', 'calc(var(--vh, 1vh) * 100)'] as unknown as string,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',

    left: '0',
    top: '0',

    zIndex: 9999,
  }),

  backdrop: (
    ({ isClickable }: BackdropProps): FelaRule => createRule({
      cursor: isClickable ? 'pointer' : 'default',
    })
  ),

  background: createRule({
    position: 'absolute',
    zIndex: -1,

    backgroundColor: cssVar('--color-feedbax-primary'),
    opacity: 0.8,

    left: '0',
    top: '0',

    width: '100%',
    height: '100%',
  }),
};
