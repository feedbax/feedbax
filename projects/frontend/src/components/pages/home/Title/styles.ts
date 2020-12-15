import { css } from '@emotion/react';
import { colors } from '~theme';
import { fluidRange } from '~lib/css-helper';

const fontSize = fluidRange({
  size: { from: '64px', to: '210px' },
  screen: { min: '320px', max: '1170px' },
  prop: (px) => ({ fontSize: px }),
});

const textShadow = fluidRange({
  screen: { min: '320px', max: '1170px' },

  sizes: [
    { from: '-2px', to: '-4px' },
    { from: '2px', to: '4px' },
    { from: '-3px', to: '-5px' },
    { from: '3px', to: '5px' },
  ],

  prop: (pxs) => ({
    textShadow: `
      ${pxs[0]} ${pxs[0]} 0px ${colors.second}, 
      ${pxs[1]} ${pxs[1]} 0px ${colors.first},
      ${pxs[2]} ${pxs[2]} 0px ${colors.third},
      ${pxs[3]} ${pxs[3]} 0px ${colors.third}
    `,
  }),
});

export const stylesTitle = css`
  position: relative;

  font-family: "Klinic Slab";
  font-style: normal;
  font-weight: normal;

  text-align: center;
  color: ${colors.third};

  margin-top: 50px;

  ${fontSize}
  ${textShadow}
`;
