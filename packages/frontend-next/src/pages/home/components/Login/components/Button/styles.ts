import { cssVar, fluid } from '@/utils/styles/helper';
import { css } from '@emotion/react';

import { inputShared } from '@/pages/home/components/Login/styles';

export const loginButton = css(
  inputShared,

  {
    color: cssVar('--color-primary-text'),
    backgroundColor: cssVar('--color-feedbax-primary'),
    borderColor: cssVar('--color-feedbax-primary'),

    cursor: 'pointer',

    ':focus, :active, :hover': {
      backgroundColor: cssVar('--color-feedbax-primary-shade-20'),
      borderColor: cssVar('--color-feedbax-primary-shade-20'),

      outline: 0,
    },
  },

  fluid(['20rem', '120rem', '240rem'], {
    height: ['3.13rem', '4.38rem', '8.75rem'],
    fontSize: ['1.5rem', '2rem', '4rem'],
  }),
);
