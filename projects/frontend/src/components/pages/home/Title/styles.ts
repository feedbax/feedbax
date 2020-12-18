import { css } from '@emotion/react';
import { colors } from '~theme';
import { between } from 'polished';

const sa = between('-0.125rem', '-0.3125rem', '20rem', '160rem');
const sb = between('0.125rem', '0.3125rem', '20rem', '160rem');
const sc = between('-0.1875rem', '-0.375rem', '20rem', '160rem');
const sd = between('0.1875rem', '0.375rem', '20rem', '160rem');

export const stylesTitle = css`
  position: relative;

  font-family: "Klinic Slab";
  font-style: normal;
  font-weight: normal;

  text-align: center;
  color: ${colors.third};

  margin-top: 50px;

  font-size: ${between('4.375rem', '17.5rem', '20rem', '160rem')};

  text-shadow:
    ${sa} ${sa} 0px ${colors.second}, 
    ${sb} ${sb} 0px ${colors.first}, 
    ${sc} ${sc} 0px ${colors.third}, 
    ${sd} ${sd} 0px ${colors.third};
`;
