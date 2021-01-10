import { fluidRangeFela, createRule } from '~lib/css-helper';

export const rules = {
  button: createRule({
    position: 'absolute',
    zIndex: '999 !important' as unknown as 999,

    fluidRange: fluidRangeFela({
      screen: ['20rem', '120rem', '240rem'] as const,
      sizes: [['1.56rem', '1.56rem', '3.13rem']] as const,

      css: ([unit]) => ({
        top: unit,
        right: unit,
      }),
    }),
  }),
};
