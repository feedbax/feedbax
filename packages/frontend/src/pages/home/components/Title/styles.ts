import { css } from '@emotion/react';
import { cssVar, fluidRange } from '@/utils/styles/helper';

export const titleText = css(
  {
    display: 'inline-block',
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
      ['4.38rem', '15rem', '30rem'],
      ['-0.13rem', '-0.25rem', '-0.5rem'],
      ['0.13rem', '0.25rem', '0.5rem'],
      ['-0.19rem', '-0.38rem', '-0.75rem'],
      ['0.19rem', '0.38rem', '0.75rem'],
    ] as const,

    style: (fontSize, sa, sb, sc, sd) => ({
      fontSize,
      textShadow: `
        ${sa} ${sa} 0px ${cssVar('--color-feedbax-secondary')}, 
        ${sb} ${sb} 0px ${cssVar('--color-feedbax-primary')}, 
        ${sc} ${sc} 0px ${cssVar('--color-primary-text')}, 
        ${sd} ${sd} 0px ${cssVar('--color-primary-text')}
      `,
    }),
  }),
);
