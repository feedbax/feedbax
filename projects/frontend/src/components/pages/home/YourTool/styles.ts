import { css } from '@emotion/react';
import { colors } from '~theme';
import { between } from 'polished';

export const stylesTool = css`
  position: relative;
  width: 100%;

  margin: 0 auto;
  margin-top: 50px;

  font-size: ${between('2rem', '4.875rem', '20rem', '160rem')};
  margin-top: ${between('3.125rem', '6.25rem', '20rem', '160rem')};
  max-width: ${between('20rem', '97.5rem', '20rem', '160rem')};

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
    font-size: ${between('2rem', '4.875rem', '20rem', '160rem')};

    color: ${colors.third};

    text-align: right;
    padding-right: 60px;
    box-sizing: border-box;
  }

  .image {
    flex: 1 1 auto;

    position: relative;
    display: block;
    width: 100%;
    max-width: 50%;
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
      max-width: 560px;
    }
  }
`;
