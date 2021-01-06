import { cssVar, fluidRangeFela } from '~lib/css-helper';
import type { FelaRule } from '~lib/css-helper';

const toolContainer: FelaRule = {
  position: 'relative',
  width: '100%',

  marginTop: '0px',
  marginRight: 'auto',
  marginBottom: '0px',
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

    css: (units) => {
      const [marginTop, maxWidth] = units;

      return {
        marginTop,
        maxWidth,
      };
    },
  }),

  nested: {
    '@media (max-width: 50rem)': {
      flexDirection: 'column-reverse',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
};

const toolText: FelaRule = {
  flexGrow: 1,
  flexShrink: 0,
  flexBasis: '0px',

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

    css: (units) => {
      const [fontSize, paddingRight] = units;

      return {
        fontSize,
        paddingRight,
      };
    },
  }),

  nested: {
    '@media (max-width: 50rem)': {
      marginTop: '1.35em',
      maxWidth: '100%',
      paddingRight: '0',
      textAlign: 'center',
    },
  },
};

const toolImage: FelaRule = {
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
};

export const rules = {
  container: toolContainer,
  text: toolText,
  image: toolImage,
};
