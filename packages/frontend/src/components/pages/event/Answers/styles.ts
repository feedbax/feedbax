import { css } from '@emotion/react';
import { cssVar, fluidRange } from '~lib/css-helper';

export const stylesLoadMore = css`
  position: absolute;
  bottom: 100vh;
  height: 1px;
  width: 1px;
`;

export const stylesAnswers = css`
  position: relative;
  padding: 0 15px;
  box-sizing: border-box;
  z-index: 1;

  .background {
    z-index: 0;

    position: absolute;
    display: block;

    top: -4px;
    left: 0;

    width: 100%;

    ${fluidRange({
      screen: ['20rem', '120rem', '240rem'] as const,
      sizes: [['2.13rem', '2.13rem', '4.25rem']] as const,
      css: ([ height ]) => ({ height }),
    })}

    background-color: ${cssVar('--color-feedbax-secondary')};
  }
`;
