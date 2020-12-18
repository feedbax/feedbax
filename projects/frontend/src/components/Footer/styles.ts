import { css } from '@emotion/react';
import { between } from 'polished';
import { colors } from '~theme';

export const stylesFooter = css`
  position: relative;
  text-align: center;

  font-family: "Klinic Slab Book";
  font-style: normal;

  color: ${colors.third};
  background-color: ${colors.fourth};

  padding: ${between('1.5rem', '2.5rem', '20rem', '160rem')};

  .title {
    font-weight: bold;
    margin-bottom: 10px;

    margin-bottom: ${between('0.5rem', '0.875rem', '20rem', '160rem')};
    font-size: ${between('2.25rem', '5rem', '20rem', '160rem')};
  }

  .copy,
  .links {
    font-weight: normal;
    color: ${colors.third};

    font-size: ${between('0.75rem', '1.625rem', '20rem', '160rem')};

    &:visited {
      color: ${colors.third};
    }
  }
`;
