import { cssVar, fluidRangeFela, createRule } from '~lib/css-helper';

export const rules = {
  container: createRule({
    position: 'relative',
    width: '100%',

    marginTop: 0,
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    fluidRange: fluidRangeFela({
      screen: ['20rem', '120rem', '240rem'] as const,

      sizes: [
        ['2.73rem', '3.13rem',  '6.25rem'],
        ['20rem',   '58rem',    '116rem'],
      ] as const,

      css: ([marginTop, maxWidth]) => ({
        marginTop,
        maxWidth,
      }),
    }),

    nested: {
      '@media (max-width: 50rem)': {
        flexDirection: 'column-reverse',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
  }),

  text: createRule({
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,

    position: 'relative',

    fontFamily: cssVar('--font-feedbax-primary'),
    fontStyle: 'normal',
    fontWeight: 'normal',

    color: cssVar('--color-primary-text'),

    textAlign: 'right',
    boxSizing: 'border-box',

    fluidRange: fluidRangeFela({
      screen: ['20rem', '120rem', '240rem'] as const,

      sizes: [
        ['2rem',    '3.6rem',   '7.2rem'],
        ['3.35rem', '3.75rem',  '7.5rem'],
      ] as const,

      css: ([fontSize, paddingRight]) => ({
        fontSize,
        paddingRight,
      }),
    }),

    nested: {
      '@media (max-width: 50rem)': {
        marginTop: '1.35em',
        maxWidth: '100%',
        paddingRight: 0,
        textAlign: 'center',
      },
    },
  }),

  image: createRule({
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',

    position: 'relative',
    display: 'block',
    width: '100%',
    maxWidth: '50%',

    nested: {
      '@media (max-width: 50rem)': {
        maxWidth: '35rem',
      },
    },
  }),
};
