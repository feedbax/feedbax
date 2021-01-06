import { css } from '@emotion/react';
import { cssVar, fluidRange } from '~lib/css-helper';

export const stylesSeeMore = css`
  position: relative;

  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      ['2.73rem', '3.13rem', '6.25rem'],
      ['1rem',    '1.13rem', '2.25rem'],
    ] as const,

    css: ([marginTop, fontSize]) => ({
      marginTop,
      fontSize,
    }),
  })}

  height: 6.8em;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  & span {
    flex: 0 1 auto;

    background: ${cssVar('--color-primary-text')};
    padding: 0.11em 0.33em;
    border-radius: 1em;

    font-family: ${cssVar('--font-feedbax-primary')};
    font-style: normal;
    font-weight: normal;
    text-align: center;

    color: ${cssVar('--color-feedbax-primary')};
  }

  & div {
    display: block;
    position: absolute;

    top: 2.1em;
    left: calc(50% - 2px);

    height: 10em;
    width: 2px;

    background: ${cssVar('--color-feedbax-primary')};
    border-right: 2px solid ${cssVar('--color-primary-text')};
    border-radius: 2px;
  }
`;
