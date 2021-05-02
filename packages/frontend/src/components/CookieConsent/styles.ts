import { cssVar, fluid } from '@/utils/styles/helper';
import { css } from '@emotion/react';

export const content = css(
  {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',

    fontFamily: cssVar('--font-feedbax-secondary'),
    textAlign: 'justify',

    paddingTop: '1rem',
    paddingRight: '1rem',
    paddingBottom: '1rem',
    paddingLeft: '1rem',

    boxSizing: 'border-box',
    maxHeight: '100%',
    overflow: 'auto',
    color: cssVar('--color-text-primary'),
  },

  fluid(['20rem', '120rem', '240rem'], {
    maxWidth: ['20rem', '40rem', '80rem'],
    fontSize: ['1rem', '1.5rem', '3rem'],
  }),
);

export const block = css({
  display: 'block',
  marginBlockStart: '1em',
  marginBlockEnd: '1em',
});

export const link = css({
  color: cssVar('--color-text-primary'),
});

export const languageChooser = css({
  paddingTop: '1em',
  marginTop: '2em',

  fontSize: '0.8em',

  color: cssVar('--color-text-primary'),
  borderTop: `1px solid ${cssVar('--color-text-primary')}`,

  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
});

export const language = css({
  flexGrow: 0,
  flexShrink: 0,
  flexBasis: 'auto',

  paddingTop: 0,
  paddingRight: '0.4em',
  paddingBottom: 0,
  paddingLeft: '0.4em',

  borderRight: `1px solid ${cssVar('--color-text-primary')}`,
  color: cssVar('--color-text-primary'),

  ':last-child': {
    borderStyle: 'none',
    borderWidth: 0,
  },
});
