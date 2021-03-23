import { cssVar, fluidRange } from '@/utils/styles/helper';
import { css } from '@emotion/react';

export const loginForm = css(
  {
    position: 'relative',
    display: 'block',
    width: '100%',
  },

  fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      ['20rem', '23.75rem', '47.5rem'],
      ['-0.13rem', '-0.25rem', '-0.5rem'],
      ['0.13rem', '0.25rem', '0.5rem'],
      ['-0.19rem', '-0.38rem', '-0.75rem'],
      ['0.19rem', '0.38rem', '0.75rem'],
    ] as const,

    style: (maxWidth, sa, sb, sc, sd) => ({
      maxWidth,

      boxShadow: `
        ${sa} ${sa} 0px ${cssVar('--color-feedbax-secondary')}, 
        ${sb} ${sb} 0px ${cssVar('--color-feedbax-primary')}, 
        ${sc} ${sc} 0px ${cssVar('--color-primary-text')}, 
        ${sd} ${sd} 0px ${cssVar('--color-primary-text')}
      `,
    }),
  }),
);

export const inputShared = css({
  position: 'relative',
  boxSizing: 'border-box',
  width: '100%',

  borderRadius: '0 !important',
  appearance: 'none',

  padding: 0,
  margin: 0,

  fontFamily: cssVar('--font-feedbax-primary'),
  fontStyle: 'normal',
  fontWeight: 'normal',

  textIndent: '1em',
  textAlign: 'left',

  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',

  borderWidth: '2px',
  borderStyle: 'solid',
});
