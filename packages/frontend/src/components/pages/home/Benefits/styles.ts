import { cssVar, fluidRangeFela, createRule } from '~lib/css-helper';

export const rules = {
  benefit: {
    container: createRule({
      position: 'relative',

      flexGrow: 1,
      flexShrink: 1,
      flexBasis: '33.33%',

      width: '100%',
      maxWidth: '33.33%',

      boxSizing: 'border-box',
      textAlign: 'center',

      nested: {
        '@media (max-width: 86rem)': {
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: '50%',

          maxWidth: '50%',
        },

        '@media (max-width: 37.5rem)': {
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: '100%',

          maxWidth: '100%',
        },
      },

      fluidRange: fluidRangeFela({
        screen: ['20rem', '120rem', '240rem'] as const,

        sizes: [
          ['1.56rem', '4.13rem', '8.25rem'],
          ['0.63rem', '1.63rem', '3.25rem'],
        ] as const,

        css: ([padding, marginTop]) => ({
          paddingTop: padding,
          paddingRight: padding,
          paddingBottom: padding,
          paddingLeft: padding,

          marginTop,
        }),
      }),
    }),

    text: createRule({
      display: 'inline-block',
      color: cssVar('--color-primary-text'),
      fontFamily: cssVar('--font-feedbax-primary'),
      fontStyle: 'normal',
      fontWeight: 'normal',
      textAlign: 'center',

      fluidRange: fluidRangeFela({
        screen: ['20rem', '120rem', '240rem'] as const,

        sizes: [
          ['1.5rem',  '2.38rem', '4.75rem'],
          ['1.13rem', '1.63rem', '3.25rem'],
        ] as const,

        css: ([fontSize, marginTop]) => ({
          fontSize,
          marginTop,
        }),
      }),

      nested: {
        '& ul': {
          textAlign: 'left',
        },

        '& code': {
          display: 'block',
          fontSize: '0.45em',

          fluidRange: fluidRangeFela({
            screen: ['20rem', '120rem', '240rem'] as const,
            sizes: [['1rem', '1.25rem', '2.5rem']] as const,
            css: ([marginTop]) => ({ marginTop }),
          }),
        },

        '& small': {
          display: 'block',
          fontFamily: cssVar('--font-feedbax-tertiary'),
          fontSize: '0.65em',

          fluidRange: fluidRangeFela({
            screen: ['20rem', '120rem', '240rem'] as const,
            sizes: [['1rem', '1.25rem', '2.5rem']] as const,
            css: ([marginTop]) => ({ marginTop }),
          }),

          nested: {
            '& ul': {
              marginTop: 0,
              marginRight: 0,
              marginBottom: 0,
              marginLeft: 0,

              marginBlock: 0,
              paddingInline: 0,
            },
          },
        },
      },
    }),

    image: createRule({}),
  },

  benefits: {
    container: createRule({
      position: 'relative',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
      flexWrap: 'wrap',

      marginRight: 'auto',
      marginLeft: 'auto',

      fluidRange: fluidRangeFela({
        screen: ['20rem', '120rem', '240rem'] as const,

        sizes: [
          ['3rem',  '5rem',     '10rem'],
          ['20rem', '90rem',    '180rem'],
        ] as const,

        css: ([margin, maxWidth]) => ({
          marginTop: margin,
          marginBottom: margin,

          maxWidth,
        }),
      }),
    }),
  },
};
