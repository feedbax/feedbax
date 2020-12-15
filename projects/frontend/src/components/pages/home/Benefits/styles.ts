import { css } from '@emotion/react';
import { fluidRange } from '~lib/css-helper';
import { colors } from '~theme';

export const stylesBenefit = css`
  position: relative;
  flex: 1 1 auto;
  width: 100%;
  max-width: 33.33%;
  box-sizing: border-box;

  ${fluidRange({
    prop: (px) => ({ padding: px }),
    size: { from: '25px', to: '50px' },
    screen: { min: '320px', max: '1170px' },
  })}

  ${fluidRange({
    prop: (px) => ({ marginTop: px }),
    size: { from: '10px', to: '20px' },
    screen: { min: '320px', max: '1170px' },
  })}

  @media (max-width: 1000px) {
    max-width: 50%;
  }

  @media (max-width: 600px) {
    max-width: 100%;
  }

  .text {
    font-family: "Klinic Slab";
    font-style: normal;
    font-weight: normal;
    color: ${colors.third};

    ${fluidRange({
      prop: (px) => ({ fontSize: px }),
      size: { from: '20px', to: '28px' },
      screen: { min: '320px', max: '1170px' },
    })}

    margin-top: 20px;

    &.left {
      text-align: left;
    }

    &.center {
      text-align: center;
    }

    code {
      display: block;
      margin-top: 20px;
      font-size: 14px;
    }

    small {
      display: block;
      margin-top: 20px;

      font-family: "Klinic Slab Book";
      text-align: left;

      ${fluidRange({
        prop: (px) => ({ fontSize: px }),
        size: { from: '18px', to: '20px' },
        screen: { min: '320px', max: '1170px' },
      })}

      ul {
        margin: 0;
        margin-block: 0;
        padding-inline: 0;
      }
    }
  }
`;

export const stylesBenefits = css`
  position: relative;
  width: 100%;
  max-width: 1170px;

  margin: 60px auto;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  flex-wrap: wrap;
`;
