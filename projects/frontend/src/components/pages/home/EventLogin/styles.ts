import { css } from '@emotion/react';
import { cssVar, fluidRange } from '~lib/css-helper';

export const stylesEventLogin = css`
  position: relative;
  display: block;

  width: 100%;
  margin: 0 auto;

  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      [ '20rem',    '23.75rem',  '47.5rem'],
      ['-0.13rem', '-0.25rem',  '-0.5rem'],
      [ '0.13rem',  '0.25rem',   '0.5rem'],
      ['-0.19rem', '-0.38rem',  '-0.75rem'],
      [ '0.19rem',  '0.38rem',   '0.75rem'],
      [ '3.13rem',  '4.38rem',   '8.75rem'],
      [ '1.5rem',   '2rem',      '4rem'],
    ] as const,

    css: ([maxWidth, sa, sb, sc, sd, height, fontSize]) => ({
      maxWidth,

      boxShadow: `
        ${sa} ${sa} 0px ${cssVar('--color-feedbax-secondary')}, 
        ${sb} ${sb} 0px ${cssVar('--color-feedbax-primary')}, 
        ${sc} ${sc} 0px ${cssVar('--color-primary-text')}, 
        ${sd} ${sd} 0px ${cssVar('--color-primary-text')}
      `,

      '& .text, & .button': {
        height,
        fontSize,
      },
    }),
  })}

  & .text,
  & .button {
    border-radius: 0 !important;
    -webkit-appearance: none;

    display: inline-block;
    position: relative;
    box-sizing: border-box;

    width: 100%;

    border: 0;

    padding: 0;
    margin: 0;

    font-family: ${cssVar('--font-feedbax-primary')};
    font-style: normal;
    font-weight: normal;

    text-indent: 1em;
    text-align: left;

    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  & .text {
    color: ${cssVar('--color-feedbax-primary')};
    border: 2px solid ${cssVar('--color-primary-text')};
    background-color: ${cssVar('--color-primary-text')};

    &:focus {
      outline: none;
      border: 2px solid ${cssVar('--color-feedbax-secondary')};
    }

    &::placeholder {
      color: ${cssVar('--color-feedbax-primary')};
      opacity: 0.8;
    }
  }

  & .button {
    color: ${cssVar('--color-primary-text')};
    background: ${cssVar('--color-feedbax-primary')};
    cursor: pointer;

    border: 2px solid ${cssVar('--color-feedbax-primary')};

    &:hover {
      background: ${cssVar('--color-feedbax-primary')};
    }

    &:focus {
      outline: none;
      border: 2px solid ${cssVar('--color-feedbax-secondary')};
    }
  }
`;
