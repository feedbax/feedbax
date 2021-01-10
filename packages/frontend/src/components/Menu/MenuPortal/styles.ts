import { cssVar, fluidRangeFela, createRule } from '~lib/css-helper';
import { FelaRule } from '~lib/css-helper/fela';

export const rules = {
  content: createRule({
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    fluidRange: fluidRangeFela({
      screen: ['20rem', '120rem', '240rem'] as const,
      sizes: [['20rem', '30rem', '60rem']] as const,
      css: ([maxWidth]) => ({ maxWidth }),
    }),
  }),

  items: createRule({
    marginTop: 0,
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
  }),

  item: createRule({
    color: cssVar('--color-primary-text'),
    fontFamily: cssVar('--font-feedbax-secondary'),
    textDecoration: 'none',
    position: 'relative',

    paddingRight: '1.2em',
    paddingLeft: '1.2em',

    fluidRange: fluidRangeFela({
      screen: ['20rem', '120rem', '240rem'] as const,

      sizes: [
        ['1.5rem',  '2rem',   '4rem'],
        ['0.4rem',  '0.5rem', '1rem'],
      ] as const,

      css: ([unit, paddingY]) => ({
        fontSize: unit,
        lineHeight: unit,

        paddingTop: paddingY,
        paddingBottom: paddingY,
      }),
    }),
  }),

  itemContent: createRule({
    nested: {
      '& *': {
        display: 'inline-block',
        color: cssVar('--color-primary-text'),
        fontFamily: cssVar('--font-feedbax-secondary'),
        textDecoration: 'none',

        fluidRange: fluidRangeFela({
          screen: ['20rem', '120rem', '240rem'] as const,
          sizes: [['1.5rem', '2rem', '4rem']] as const,

          css: ([unit]) => ({
            fontSize: unit,
            lineHeight: unit,
          }),
        }),

        nested: {
          ':focus': {
            outlineWidth: 0,
          },
        },
      },
    },
  }),

  itemIcon: createRule({
    position: 'absolute',
    left: '0',
    top: '0',
    bottom: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    nested: {
      '& svg': {
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto',

        width: '0.8em',
        height: '0.8em',
      },
    },
  }),

  tabable: createRule({
    nested: {
      ':hover': {
        opacity: 0.6,
      },

      ':active': {
        opacity: 1,
      },
    },
  }),

  buttonBack: (
    (show: boolean): FelaRule => createRule({
      visibility: show ? 'visible' : 'hidden',

      nested: {
        '@media (max-width: 37.5rem)': {
          position: 'absolute',
          top: '1.5625rem',
          left: '1.5625rem',
        },
      },
    })
  ),

  buttonClose: createRule({
    nested: {
      '@media (max-width: 37.5rem)': {
        position: 'absolute',
        top: '1.5625rem',
        right: '1.5625rem',
      },
    },
  }),
};
