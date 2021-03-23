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

      borderWidth: '2px',
      borderStyle: 'solid',
      borderRightColor: cssVar('--color-feedbax-primary'),
      borderBottomColor: cssVar('--color-feedbax-primary'),
      borderTopColor: cssVar('--color-feedbax-secondary'),
      borderLeftColor: cssVar('--color-feedbax-secondary'),
    },
  },

  fluid(['20rem', '120rem', '240rem'], {
    height: ['3.13rem', '4.38rem', '8.75rem'],
    fontSize: ['1.5rem', '2rem', '4rem'],
  }),
);
