import { cssVar } from '@/utils/styles/helper';
import { css } from '@emotion/react';

export const portal = css({
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

export const background = css({
  position: 'absolute',
  zIndex: -1,

  backgroundColor: cssVar('--color-feedbax-primary'),
  opacity: 0.8,

  left: '0',
  top: '0',

  width: '100%',
  height: '100%',
});
