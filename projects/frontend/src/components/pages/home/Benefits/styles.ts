import { css } from '@emotion/react';
import { between } from 'polished';
import { colors } from '~theme';

export const stylesBenefit = css`
  position: relative;
  flex: 1 1 auto;
  width: 100%;
  max-width: 33.33%;
  box-sizing: border-box;

  padding: ${between('1.5625rem', '4.125rem', '20rem', '160rem')};
  margin-top: ${between('0.625rem', '1.625rem', '20rem', '160rem')};

  @media (max-width: 1377px) {
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

    font-size: ${between('1.25rem', '2.375rem', '20rem', '160rem')};
    margin-top: ${between('1.125rem', '1.625rem', '20rem', '160rem')};

    &.left {
      text-align: left;
    }

    &.center {
      text-align: center;
    }

    code {
      display: block;
      margin-top: 20px;

      font-size: ${between('0.75rem', '1.125rem', '20rem', '160rem')};
    }

    small {
      display: block;
      margin-top: 20px;

      font-family: "Klinic Slab Book";
      text-align: left;

      font-size: ${between('1.125rem', '1.625rem', '20rem', '160rem')};

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

  margin: ${between('3rem', '5rem', '20rem', '160rem')} auto;
  max-width: ${between('20rem', '97.5rem', '20rem', '160rem')};

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  flex-wrap: wrap;
`;
