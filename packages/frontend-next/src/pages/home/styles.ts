import { cssVar } from '@/utils/styles/helper';
import { css } from '@emotion/react';

export const container = css({
  color: cssVar('--color-white-100'),

  fontFamily: cssVar('--font-feedbax-primary'),
  fontSize: '3rem',

  position: 'relative',
  width: '100%',
});

export const main = css({
  color: cssVar('--color-feedbax-primary'),
  fontFamily: cssVar('--font-feedbax-primary'),
  fontSize: '3rem',

  position: 'relative',
  zIndex: 1,

  width: '100%',
  minHeight: ['calc(var(--vh, 1vh) * 100)', '100vh'],

  paddingTop: '16px',
  boxSizing: 'border-box',
});
