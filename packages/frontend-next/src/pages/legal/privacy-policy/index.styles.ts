import { cssVar, fluid } from '@/utils/styles/helper';
import { css } from '@emotion/react';

export const container = css(
  {
    fontFamily: cssVar('--font-feedbax-secondary'),

    position: 'relative',
    backgroundColor: cssVar('--color-feedbax-primary'),

    color: cssVar('--color-primary-text'),
    textAlign: 'left',
  },

  fluid(['20rem', '120rem', '240rem'], {
    paddingTop: ['1.5rem', '2.5rem', '5rem'],
  }),
);

export const content = css(
  {
    textAlign: 'justify',

    paddingTop: 0,
    paddingRight: '20px',
    paddingBottom: 0,
    paddingLeft: '20px',

    marginRight: 'auto',
    marginLeft: 'auto',

    boxSizing: 'border-box',
    color: cssVar('--color-primary-text'),

    '& *': {
      whiteSpace: 'normal',
      overflowWrap: 'break-word',
      color: cssVar('--color-primary-text'),
    },
  },

  fluid(['20rem', '120rem', '240rem'], {
    marginTop: ['2.75rem', '3.75rem', '7.5rem'],
    marginBottom: ['2.75rem', '3.75rem', '7.5rem'],

    fontSize: ['1rem', '1.5rem', '3rem'],
    maxWidth: ['25rem', '50rem', '100rem'],
  }),
);
