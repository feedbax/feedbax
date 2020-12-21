import { css } from '@emotion/react';
import { fluidRange } from '~lib/css-helper';
import { colors } from '~theme';

export const stylesSeeMore = css`
  position: relative;

  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,
    sizes: [['1rem', '1.125rem', '2.25rem']] as const,
    css: ([fontSize]) => ({ fontSize }),
  })}

  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,
    sizes: [['2.725rem', '3.125rem', '6.25rem']] as const,
    css: ([marginTop]) => ({ marginTop }),
  })}

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
