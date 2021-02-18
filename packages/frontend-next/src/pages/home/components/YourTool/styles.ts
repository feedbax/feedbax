import { css } from '@emotion/react';
import { cssVar, fluid } from '@/utils/styles/helper';

export const container = css({
  position: 'relative',

  fontFamily: cssVar('--font-feedbax-primary'),
  fontStyle: 'normal',
  fontWeight: 'normal',
  textAlign: 'right',

  color: cssVar('--color-primary-text'),

  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',

  '@media (max-width: 50rem)': {
    flexDirection: 'column-reverse',
    textAlign: 'center',
  },
});

export const text = css(
  {
    flex: '1 1 50%',
  },

  fluid(['20rem', '120rem', '240rem'], {
    padding: ['2rem', '3.75rem', '7.5rem'],
    fontSize: ['2rem', '3.6rem', '7.2rem'],
  }),
);

export const image = css(
  {
    flex: '1 1 auto',

    position: 'relative',
    display: 'block',
  },

  // fluid(['20rem', '50rem'], {
  //   width: ['20rem', '50rem'],
  //   height: ['18.23rem', '45.59rem'],
  // }),

  fluid(['20rem', '120rem', '240rem'], {
    width: ['18rem', '40rem', '80rem'],
    height: ['16.41rem', '36.47rem', '72.94rem'],
  }),
);
