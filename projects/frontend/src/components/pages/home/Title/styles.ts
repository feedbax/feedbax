import { css } from '@emotion/react';
import { colors } from '~theme';
import { fluidRange } from '~lib/css-helper';

export const stylesTitle = css`
  position: relative;

  font-family: "Klinic Slab";
  font-style: normal;
  font-weight: normal;

  text-align: center;
  color: ${colors.third};

  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      [ '4.38rem',   '15rem',    '30rem'],
      [ '2.73rem',   '3.13rem',  '6.25rem'],
      ['-0.13rem',  '-0.25rem', '-0.5rem'],
      [ '0.13rem',   '0.25rem',  '0.5rem'],
      ['-0.19rem',  '-0.38rem', '-0.75rem'],
      [ '0.19rem',   '0.38rem',  '0.75rem'],
    ] as const,

    css: ([fontSize, marginTop, sa, sb, sc, sd]) => ({
      fontSize,
      marginTop,

      textShadow: `
        ${sa} ${sa} 0px ${colors.second}, 
        ${sb} ${sb} 0px ${colors.first}, 
        ${sc} ${sc} 0px ${colors.third}, 
        ${sd} ${sd} 0px ${colors.third}
      `,
    }),
  })}
`;
