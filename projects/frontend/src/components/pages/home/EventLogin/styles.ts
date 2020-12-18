import { css } from '@emotion/react';
import { between } from 'polished';
import { colors } from '~theme';

const sa = between('-0.125rem', '-0.3125rem', '20rem', '160rem');
const sb = between('0.125rem', '0.3125rem', '20rem', '160rem');
const sc = between('-0.1875rem', '-0.375rem', '20rem', '160rem');
const sd = between('0.1875rem', '0.375rem', '20rem', '160rem');

export const stylesEventLogin = css`
  position: relative;
  display: block;

  width: 100%;

  max-width: ${between('18.75rem', '25rem', '20rem', '160rem')};
  margin: 0 auto;

  box-shadow:
    ${sa} ${sa} 0px ${colors.second}, 
    ${sb} ${sb} 0px ${colors.first}, 
    ${sc} ${sc} 0px ${colors.third}, 
    ${sd} ${sd} 0px ${colors.third};

  & .text,
  & .button {
    border-radius: 0 !important;
    -webkit-appearance: none;

    display: inline-block;
    position: relative;
    box-sizing: border-box;

    width: 100%;
    height: ${between('3.5rem', '4.75rem', '20rem', '160rem')};

    border: 0;
    outline: 0;

    padding: 0;
    margin: 0;

    font-family: "Klinic Slab";
    font-style: normal;
    font-weight: normal;
    font-size: ${between('1.5rem', '2.25rem', '20rem', '160rem')};

    text-indent: 1em;
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
