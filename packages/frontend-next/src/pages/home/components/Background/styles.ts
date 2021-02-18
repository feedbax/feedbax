import { css } from '@emotion/react';
import { cssVar, fluid } from '@/utils/styles/helper';

export const backgroundContainer = css({
  position: 'absolute',
  zIndex: -1,

  width: '100%',
  height: '100%',

  top: 0,
  left: 0,

  display: 'flex',
  flexDirection: 'column',
});

export const imagesContainer = css({
  flex: '0 0 auto',

  position: 'relative',
  backgroundColor: cssVar('--color-white-100'),

  width: '100%',
  minHeight: '100vh',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const topContainer = css(
  {
    position: 'relative',
    width: '100%',
  },

  fluid(['20rem', '120rem', '240rem'], {
    marginTop: ['0rem', '-27.5rem', '-55rem'],
  }),
);

export const topImage = css({
  position: 'relative',
  display: 'block',
  height: 'auto',
  width: 'auto',
});

export const bottomContainer = css({
  position: 'relative',
  width: '100%',
});

export const bottomImage = css({
  position: 'relative',
  display: 'block',
  height: 'auto',
  width: 'auto',
});

export const coloredBackground = css({
  zIndex: 1,
  marginTop: -8,
  flex: '1 1 auto',
  backgroundColor: cssVar('--color-feedbax-primary'),
});
