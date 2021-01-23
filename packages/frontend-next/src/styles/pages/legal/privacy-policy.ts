import { createRule, cssVar, fluidRange } from '@/styles/helper';

const container = createRule({
  fontFamily: cssVar('--font-feedbax-secondary'),

  position: 'relative',
  backgroundColor: cssVar('--color-feedbax-primary'),

  color: cssVar('--color-primary-text'),
  textAlign: 'left',

  fluidRange: fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,
    sizes: [['1.5rem', '2.5rem', '5rem']] as const,

    css: ([paddingTop]) => ({
      paddingTop,
    }),
  }),
});

const content = createRule({
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

  fluidRange: fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      ['2.75rem', '3.75rem', '7.5rem'],
      ['1rem', '1.5rem', '3rem'],
      ['25rem', '50rem', '100rem'],
    ] as const,

    css: ([margin, fontSize, maxWidth]) => ({
      marginTop: margin,
      marginBottom: margin,

      fontSize,
      maxWidth,
    }),
  }),
});

export const rules = { container, content };
