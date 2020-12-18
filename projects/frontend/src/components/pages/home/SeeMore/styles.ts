import { css } from '@emotion/react';
import { between } from 'polished';
import { colors } from '~theme';

export const stylesSeeMore = css`
  position: relative;

  font-size: ${between('1.125rem', '2.25rem', '20rem', '160rem')};

  margin-top: 50px;
  height: 6.8em;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  & span {
    flex: 0 1 auto;

    background: ${colors.third};
    padding: 0.11em 0.33em;
    border-radius: 1em;

    font-family: "Klinic Slab";
    font-style: normal;
    font-weight: normal;
    text-align: center;

    color: ${colors.first};
  }

  & div {
    display: block;
    position: absolute;

    top: 2.1em;
    left: calc(50% - 2px);

    height: 10em;
    width: 2px;

    background: ${colors.first};
    border-right: 2px solid ${colors.third};
    border-radius: 2px;
  }
`;
