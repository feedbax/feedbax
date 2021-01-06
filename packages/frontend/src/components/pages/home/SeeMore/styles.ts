import { cssVar, fluidRangeFela } from '~lib/css-helper';
import type { FelaRule } from '~lib/css-helper';

const seeMoreContainer: FelaRule = {
  position: 'relative',
  height: '6.8em',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',

  fluidRange: fluidRangeFela({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      ['2.73rem', '3.13rem', '6.25rem'],
      ['1rem',    '1.13rem', '2.25rem'],
    ] as const,

    css: ([marginTop, fontSize]) => ({
      marginTop,
      fontSize,
    }),
  }),
};

const seeMoreText: FelaRule = {
  flexGrow: 0,
  flexShrink: 1,
  flexBasis: 'auto',

  paddingTop: '0.11em',
  paddingRight: '0.33em',
  paddingBottom: '0.11em',
  paddingLeft: '0.33em',

  borderRadius: '1em',

  backgroundColor: cssVar('--color-primary-text'),
  color: cssVar('--color-feedbax-primary'),
  fontFamily: cssVar('--font-feedbax-primary'),

  fontStyle: 'normal',
  fontWeight: 'normal',
  textAlign: 'center',
};

const seeMoreArrow: FelaRule = {
  display: 'block',
  position: 'absolute',

  top: '2.1em',
  left: 'calc(50% - 2px)',

  height: '10em',
  width: '2px',

  backgroundColor: cssVar('--color-feedbax-primary'),
  borderRight: `2px solid ${cssVar('--color-primary-text')}`,
  borderRadius: '2px',
};

export const rules = {
  seeMore: {
    container: seeMoreContainer,
    text: seeMoreText,
    arrow: seeMoreArrow,
  },
};
