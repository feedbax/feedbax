import { cssVar, fluidRangeFela } from '~lib/css-helper';
import type { FelaRule } from '~lib/css-helper';

const eventLoginContainer: FelaRule = {
  position: 'relative',
  display: 'block',

  width: '100%',

  marginTop: 0,
  marginRight: 'auto',
  marginBottom: 0,
  marginLeft: 'auto',

  fluidRange: fluidRangeFela({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      [ '20rem',    '23.75rem',  '47.5rem'],
      ['-0.13rem', '-0.25rem',  '-0.5rem'],
      [ '0.13rem',  '0.25rem',   '0.5rem'],
      ['-0.19rem', '-0.38rem',  '-0.75rem'],
      [ '0.19rem',  '0.38rem',   '0.75rem'],
    ] as const,

    css: ([maxWidth, sa, sb, sc, sd]) => ({
      maxWidth,

      boxShadow: `
        ${sa} ${sa} 0px ${cssVar('--color-feedbax-secondary')}, 
        ${sb} ${sb} 0px ${cssVar('--color-feedbax-primary')}, 
        ${sc} ${sc} 0px ${cssVar('--color-primary-text')}, 
        ${sd} ${sd} 0px ${cssVar('--color-primary-text')}
      `,
    }),
  }),
};

const eventLoginInput: FelaRule = {
  position: 'relative',
  boxSizing: 'border-box',
  width: '100%',

  borderRadius: '0 !important',
  appearance: 'none',

  paddingTop: 0,
  paddingRight: 0,
  paddingBottom: 0,
  paddingLeft: 0,

  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,

  fontFamily: cssVar('--font-feedbax-primary'),
  fontStyle: 'normal',
  fontWeight: 'normal',

  textIndent: '1em',
  textAlign: 'left',

  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',

  color: cssVar('--color-feedbax-primary'),
  backgroundColor: cssVar('--color-primary-text'),

  borderColor: cssVar('--color-primary-text'),
  borderWidth: '2px',
  borderStyle: 'solid',

  nested: {
    ':focus': {
      outlineStyle: 'none',

      borderColor: cssVar('--color-feedbax-secondary'),
      borderWidth: '2px',
      borderStyle: 'solid',
    },

    '::placeholder': {
      color: cssVar('--color-feedbax-primary'),
      opacity: 0.8,
    },
  },

  fluidRange: fluidRangeFela({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      [ '3.13rem',  '4.38rem',  '8.75rem'],
      [ '1.5rem',   '2rem',     '4rem'],
    ] as const,

    css: ([height, fontSize]) => ({
      height,
      fontSize,
    }),
  }),
};

const eventLoginButton: FelaRule = {
  position: 'relative',
  boxSizing: 'border-box',
  width: '100%',

  borderRadius: '0 !important',
  appearance: 'none',

  paddingTop: 0,
  paddingRight: 0,
  paddingBottom: 0,
  paddingLeft: 0,

  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,

  fontFamily: cssVar('--font-feedbax-primary'),
  fontStyle: 'normal',
  fontWeight: 'normal',

  textIndent: '1em',
  textAlign: 'left',

  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',

  color: cssVar('--color-primary-text'),
  backgroundColor: cssVar('--color-feedbax-primary'),
  cursor: 'pointer',

  borderColor: cssVar('--color-feedbax-primary'),
  borderWidth: '2px',
  borderStyle: 'solid',

  nested: {
    ':hover': {
      backgroundColor: cssVar('--color-feedbax-primary'),
    },

    ':focus': {
      outlineStyle: 'none',

      borderColor: cssVar('--color-feedbax-secondary'),
      borderWidth: '2px',
      borderStyle: 'solid',
    },
  },

  fluidRange: fluidRangeFela({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      [ '3.13rem',  '4.38rem',  '8.75rem'],
      [ '1.5rem',   '2rem',     '4rem'],
    ] as const,

    css: ([height, fontSize]) => ({
      height,
      fontSize,
    }),
  }),
};

export const rules = {
  container: eventLoginContainer,
  input: eventLoginInput,
  button: eventLoginButton,
};
