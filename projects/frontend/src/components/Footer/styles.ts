import { css } from '@emotion/react';
import { fluidRange } from '~lib/css-helper';
import { colors } from '~theme';

export const stylesFooter = css`
  position: relative;
  padding: 30px;
  text-align: center;

  font-family: "Klinic Slab Book";
  font-style: normal;

  color: ${colors.third};
  background-color: ${colors.fourth};

  .title {
    font-weight: bold;
    margin-bottom: 10px;

    ${fluidRange({
      prop: (px) => ({ fontSize: px }),
      size: { from: '36px', to: '60px' },
      screen: { min: '320px', max: '1170px' },
    })}
  }

  .copy,
  .links {
    font-weight: normal;
    color: ${colors.third};

    ${fluidRange({
      prop: (px) => ({ fontSize: px }),
      size: { from: '12px', to: '20px' },
      screen: { min: '320px', max: '1170px' },
    })}

    &:visited {
      color: ${colors.third};
    }
  }
`;
