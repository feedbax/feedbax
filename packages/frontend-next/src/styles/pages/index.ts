import { createRule, cssVar } from '@/styles/helper';

const container = createRule({
  color: cssVar('--color-feedbax-primary'),
  fontFamily: cssVar('--font-feedbax-primary'),
  fontSize: '3rem',

  position: 'relative',
  height: '100%',
  width: '100%',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const rules = { container };
