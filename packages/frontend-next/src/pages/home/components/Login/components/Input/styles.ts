import { cssVar, fluid } from '@/utils/styles/helper';
import { css } from '@emotion/react';

import { inputShared } from '@/pages/home/components/Login/styles';

export const eventCodeInput = css(
  inputShared,

  {
    color: cssVar('--color-feedbax-primary'),
    backgroundColor: cssVar('--color-primary-text'),
    borderColor: cssVar('--color-primary-text'),

    '::placeholder': {
      color: cssVar('--color-feedbax-primary'),
      opacity: 0.8,
    },

    ':focus, :active, :hover': {
      outline: 0,
      border: `2px solid ${cssVar('--color-feedbax-primary')}`,
      boxSizing: 'border-box',
    },
  },

  fluid(['20rem', '120rem', '240rem'], {
    height: ['3.13rem', '4.38rem', '8.75rem'],
    fontSize: ['1.5rem', '2rem', '4rem'],
  }),
);
