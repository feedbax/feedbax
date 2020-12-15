import { css } from '@emotion/react';
import { fluidRange } from '~lib/css-helper';
import { colors } from '~theme';

const boxShadow = fluidRange({
  screen: { min: '320px', max: '1170px' },

  sizes: [
    { from: '-2px', to: '-4px' },
    { from: '2px', to: '4px' },
    { from: '-3px', to: '-5px' },
    { from: '3px', to: '5px' },
  ],

  prop: (pxs) => ({
    boxShadow: `
      ${pxs[0]} ${pxs[0]} 0px ${colors.second}, 
      ${pxs[1]} ${pxs[1]} 0px ${colors.first},
      ${pxs[2]} ${pxs[2]} 0px ${colors.third},
      ${pxs[3]} ${pxs[3]} 0px ${colors.third}
    `,
  }),
});

export const stylesEventLogin = css`
  position: relative;
  display: block;

  max-width: 320px;
  width: 100%;

  margin: 0 auto;
  margin-top: 20px;

  ${boxShadow}

  & .text,
  & .button {
    border-radius: 0 !important;
    -webkit-appearance: none;

    display: inline-block;
    position: relative;
    box-sizing: border-box;

    width: 100%;
    height: 56px;

    border: 0;
    outline: 0;

    padding: 0;
    margin: 0;

    font-family: "Klinic Slab";
    font-style: normal;
    font-weight: normal;
    font-size: 26px;

    text-indent: 36px;
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
