import { cssVar, fluid } from '@/utils/styles/helper';
import { css } from '@emotion/react';

export const button = css(
  {
    display: 'inline-block',
    cursor: 'pointer',
    backgroundColor: cssVar('--color-feedbax-secondary'),

    ':hover, :focus, :active': {
      backgroundColor: cssVar('--color-feedbax-secondary-shade-20'),
      outline: 0,
    },
  },

  fluid(['20rem', '120rem', '240rem'], {
    paddingTop: ['0.13rem', '0.13rem', '0.25rem'],
    paddingRight: ['0.31rem', '0.31rem', '0.63rem'],
    paddingBottom: ['0.13rem', '0.13rem', '0.25rem'],
    paddingLeft: ['0.31rem', '0.31rem', '0.63rem'],
  }),
);
