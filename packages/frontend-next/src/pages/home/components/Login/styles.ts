import { css } from '@emotion/react';
import { cssVar, fluid, fluidRange } from '@/utils/styles/helper';

export const titleText = css(
  {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    position: 'relative',

    fontFamily: cssVar('--font-feedbax-primary'),
    fontStyle: 'normal',
    fontWeight: 'normal',

    textAlign: 'center',
    color: cssVar('--color-primary-text'),
  },

  fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      ['-0.13rem', '-0.25rem', '-0.5rem'],
      ['0.13rem', '0.25rem', '0.5rem'],
      ['-0.19rem', '-0.38rem', '-0.75rem'],
      ['0.19rem', '0.38rem', '0.75rem'],
    ] as const,

    style: (sa, sb, sc, sd) => ({
      textShadow: `
        ${sa} ${sa} 0px ${cssVar('--color-feedbax-secondary')}, 
        ${sb} ${sb} 0px ${cssVar('--color-feedbax-primary')}, 
        ${sc} ${sc} 0px ${cssVar('--color-primary-text')}, 
        ${sd} ${sd} 0px ${cssVar('--color-primary-text')}
      `,
    }),
  }),

  fluid(['20rem', '120rem', '240rem'], {
    fontSize: ['4.38rem', '15rem', '30rem'],
    marginTop: ['2.73rem', '3.13rem', '6.25rem'],
  }),
);
