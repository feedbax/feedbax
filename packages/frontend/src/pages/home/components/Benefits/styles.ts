import { css } from '@emotion/react';

export const benefitsContainer = css(
  {
    position: 'relative',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 33.33%)',

    '@media (max-width: 86rem)': {
      gridTemplateColumns: 'repeat(2, 50%)',
    },

    '@media (max-width: 37.5rem)': {
      gridTemplateColumns: 'repeat(1, 100%)',
    },
  },
);
