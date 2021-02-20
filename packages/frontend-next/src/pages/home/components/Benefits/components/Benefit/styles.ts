import { cssVar, fluid, fluidRange } from '@/utils/styles/helper';
import { css } from '@emotion/react';

export const benefitContainer = css(
  {
    position: 'relative',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  fluid(['20rem', '120rem', '240rem'], {
    padding: ['1.5rem', '3.5rem', '7rem'],
  }),
);

export const benefitText = css(
  {
    position: 'relative',
    color: cssVar('--color-primary-text'),
    fontFamily: cssVar('--font-feedbax-primary'),
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',

    '& ul': {
      textAlign: 'left',
      margin: 0,
      marginBlock: 0,
      paddingInline: 0,
    },

    '& code': {
      display: 'block',
      fontSize: '0.45em',
    },

    '& small': {
      display: 'block',
      fontFamily: cssVar('--font-feedbax-tertiary'),
      fontSize: '0.65em',
    },
  },

  fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,
    sizes: [['1rem', '1.25rem', '2.5rem']] as const,

    style: (marginTop) => ({
      '& code, & small': {
        marginTop,
      },
    }),
  }),

  fluid(['20rem', '120rem', '240rem'], {
    fontSize: ['1.5rem', '2.38rem', '4.75rem'],
    marginTop: ['1.13rem', '1.63rem', '3.25rem'],
  }),
);

export const benefitImage = css({
  position: 'relative',
  margin: '0 auto',
  width: '100%',
});
