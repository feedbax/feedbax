import { cssVar, fluidRangeFela, createRule } from '~lib/css-helper';

export const rules = {
  background: createRule({
    position: 'absolute',

    top: 0,
    left: 0,

    width: '100%',
    height: ['100vh', 'calc(var(--vh, 1vh) * 100)'] as unknown as string,

    backgroundColor: cssVar('--color-primary-text'),
    zIndex: '0 !important' as unknown as 0,

    fluidRange: fluidRangeFela({
      screen: ['20rem', '120rem', '240rem'] as const,

      sizes: [
        ['31.06rem', '52.09rem', '104.19rem'],
        ['6rem',     '45rem',    '90rem'],
      ] as const,

      css: ([minHeight, paddingBottom]) => ({
        minHeight,
        paddingBottom,
      }),
    }),
  }),

  image: createRule({
    position: 'absolute',
    width: '100%',
    height: 'auto',

    nested: {
      '& svg': {
        display: 'block',
      },
    },
  }),

  top: createRule({
    maxWidth: '70%',
    right: 0,

    fluidRange: fluidRangeFela({
      screen: ['20rem', '120rem', '240rem'] as const,

      sizes: [
        ['0rem',  '-12.5rem', '-25rem'],
        ['64rem', '64rem',    '128rem'],
      ] as const,

      css: ([top, maxHeight]) => ({
        top,

        nested: {
          '@media (orientation: portrait)': {
            maxHeight,
          },
        },
      }),
    }),

    nested: {
      '@media (orientation: portrait)': {
        maxWidth: '100%',
      },
    },
  }),

  bottom: createRule({
    bottom: '-4px',
    left: 0,
  }),
};
