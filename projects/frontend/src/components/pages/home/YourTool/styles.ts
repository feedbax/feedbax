import { css } from '@emotion/react';
import { colors } from '~theme';
import { fluidRange } from '~lib/css-helper';

export const stylesTool = css`
  position: relative;
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;
  margin-top: 50px;

  ${fluidRange({
    prop: (px) => ({ marginTop: px }),
    size: { from: '50px', to: '100px' },
    screen: { min: '320px', max: '1170px' },
  })}

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .text {
    flex: 1 0 0;
    position: relative;

    font-family: "Klinic Slab";
    font-style: normal;
    font-weight: normal;

    ${fluidRange({
      prop: (px) => ({ fontSize: px }),
      size: { from: '32px', to: '58px' },
      screen: { min: '320px', max: '1170px' },
    })}

    color: ${colors.third};

    text-align: right;
    padding-right: 60px;
    box-sizing: border-box;
  }

  .image {
    flex: 1 1 auto;

    position: relative;
    display: block;
    width: 50%;
    max-width: 585px;
  }

  @media (max-width: 800px) {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;

    .text {
      max-width: 100%;
      padding-right: 0;
      margin-top: 50px;
      text-align: center;
    }

    .image {
      width: 100%;
    }
  }
`;
