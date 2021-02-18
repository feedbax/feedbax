import { css } from '@emotion/react';
import { cssVar, fluid, fluidRange } from '@/utils/styles/helper';

export const container = css({
  color: cssVar('--color-white-100'),

  position: 'relative',
  width: '100%',
});

export const main = css(
  {
    color: cssVar('--color-feedbax-primary'),

    position: 'relative',
    zIndex: 1,

    width: '100%',
    minHeight: ['calc(var(--vh, 1vh) * 100)', '100vh'],

    boxSizing: 'border-box',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  fluid(['20rem', '120rem', '240rem'], {
    paddingTop: ['1rem', '1rem', '2rem'],
  }),
);

export const mainGroup = css(
  {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '3rem 0',
  },

  fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      ['1rem', '2rem', '4rem'],
      ['2.73rem', '3.13rem', '6.25rem'],
    ] as const,

    style: (marginTopLoginForm, marginTopSeeMore) => ({
      '& .login-form': {
        marginTop: marginTopLoginForm,
      },

      '& .see-more': {
        marginTop: marginTopSeeMore,
      },
    }),
  }),
);

export const yourToolGroup = css(
  {
    position: 'relative',
    margin: '0 auto',
  },

  fluid(['20rem', '120rem', '240rem'], {
    maxWidth: ['20rem', '80rem', '160rem'],
  }),
);
