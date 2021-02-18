import { css } from '@emotion/react';
import { cssVar, fluid } from '@/utils/styles/helper';

export const seeMoreContainer = css(
  {
    position: 'relative',
    height: '11em',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  fluid(['20rem', '120rem', '240rem'], {
    fontSize: ['1rem', '1.13rem', '2.25rem'],
  }),
);

export const seeMoreText = css({
  flex: '0 1 auto',
  borderRadius: '1em',
  padding: '0.11em 0.33em',

  backgroundColor: cssVar('--color-primary-text'),
  color: cssVar('--color-feedbax-primary'),
  fontFamily: cssVar('--font-feedbax-primary'),

  fontStyle: 'normal',
  fontWeight: 'normal',
  textAlign: 'center',
});

export const seeMoreGuide = css(
  {
    display: 'block',
    height: '10em',
    marginTop: '1em',
    width: 0,

    borderRightColor: cssVar('--color-primary-text'),
    borderRightStyle: 'solid',

    borderLeftColor: cssVar('--color-feedbax-primary'),
    borderLeftStyle: 'solid',
  },

  fluid(['20rem', '120rem', '240rem'], {
    borderRightWidth: ['0.13rem', '0.13rem', '0.25rem'],
    borderLeftWidth: ['0.13rem', '0.13rem', '0.25rem'],
    borderRadius: ['0.13rem', '0.13rem', '0.25rem'],
  }),
);
