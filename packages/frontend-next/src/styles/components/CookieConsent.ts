import { createRule, fluidRange, cssVar } from '@/styles/helper';

const content = createRule({
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
  color: cssVar('--color-primary-text'),

  fluidRange: fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      ['20rem', '40rem', '80rem'],
      ['1rem', '1.5rem', '3rem'],
    ] as const,

    css: ([maxWidth, fontSize]) => ({
      maxWidth,
      fontSize,
    }),
  }),
});

const block = createRule({
  display: 'block',
  marginBlockStart: '1em',
  marginBlockEnd: '1em',
});

const link = createRule({
  color: cssVar('--color-primary-text'),
});

const button = createRule({
  display: 'inline-block',
  cursor: 'pointer',
  backgroundColor: cssVar('--color-feedbax-secondary'),

  fluidRange: fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      ['0.13rem', '0.13rem', '0.25rem'],
      ['0.31rem', '0.31rem', '0.63rem'],
    ] as const,

    css: ([paddingY, paddingX]) => ({
      paddingTop: paddingY,
      paddingRight: paddingX,
      paddingBottom: paddingY,
      paddingLeft: paddingX,
    }),
  }),

  ':hover': {
    opacity: 0.8,
  },
});

const languageChooser = createRule({
  paddingTop: '1em',
  marginTop: '2em',

  fontSize: '0.8em',

  color: cssVar('--color-primary-text'),
  borderTop: `1px solid ${cssVar('--color-primary-text')}`,

  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
});

const language = createRule({
  flexGrow: 0,
  flexShrink: 0,
  flexBasis: 'auto',

  paddingTop: 0,
  paddingRight: '0.4em',
  paddingBottom: 0,
  paddingLeft: '0.4em',

  borderRight: `1px solid ${cssVar('--color-primary-text')}`,
  color: cssVar('--color-primary-text'),

  ':last-child': {
    borderStyle: 'none',
    borderWidth: 0,
  },
});

export const rules = {
  content,
  block,
  link,
  button,
  languageChooser,
  language,
};
