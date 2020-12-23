import { css } from '@emotion/react';
import { fluidRange } from '~lib/css-helper';
import { colors } from '~theme';

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
        ${sa} ${sa} 0px ${colors.second}, 
        ${sb} ${sb} 0px ${colors.first}, 
        ${sc} ${sc} 0px ${colors.third}, 
        ${sd} ${sd} 0px ${colors.third}
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
    outline: 0;

    padding: 0;
    margin: 0;

    font-family: "Klinic Slab";
    font-style: normal;
    font-weight: normal;

    text-indent: 1em;
    text-align: left;

    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  & .text {
    color: ${colors.first};
    border: 2px solid ${colors.third};
    background-color: ${colors.third};

    &:focus {
      border: 2px solid ${colors.second};
    }

    &::placeholder {
      color: ${colors.first};
      opacity: 0.8;
    }
  }

  & .button {
    color: ${colors.third};
    background: ${colors.first};
    cursor: pointer;

    border: 2px solid ${colors.first};

    &:hover {
      background: ${colors.first};
    }

    &:focus {
      border: 2px solid ${colors.second};
    }
  }
`;
