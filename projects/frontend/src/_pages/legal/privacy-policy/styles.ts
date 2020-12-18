import { css } from '@emotion/react';
import { colors } from '~theme';
import { between } from 'polished';

export const stylesLegal = css`
  font-family: "Roboto Slab";

  position: relative;
  background-color: ${colors.first};

  color: ${colors.third};
  text-align: left;

  padding-top: ${between('1.5rem', '2.5rem', '20rem', '160rem')};

  * {
    color: ${colors.third};
  }

  .content {
    margin: ${between('1rem', '1.5rem', '20rem', '160rem')} auto;
    font-size: ${between('1rem', '1.5rem', '20rem', '160rem')};
    max-width: ${between('25rem', '50rem', '20rem', '160rem')};
    text-align: justify;

    margin: 60px auto;
    padding: 0 20px;
    box-sizing: border-box;
  }
`;
