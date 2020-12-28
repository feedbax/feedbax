import { css } from '@emotion/react';
import { cssVar, fluidRange } from '~lib/css-helper';

export const stylesAnswer = css`
  position: relative;
  z-index: 1;

  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      ['33.75rem',  '33.75rem', '67.5rem'],
      ['0.63rem',   '0.63rem',  '1.26rem'],
      ['1rem',      '1rem',     '2rem'],
      ['2rem',      '2rem',     '4rem'],
      ['0.5rem',    '0.5rem',   '1rem'],
      ['0.8rem',    '0.8rem',   '1.6rem'],
    ] as const,

    css: ([
      maxWidth,
      shadowY,
      multiPurpose,
      minWidthLikeCount,
      paddingRightLikeCount,
      fontSizeLikeCount,
    ]) => ({
      maxWidth,
      padding: multiPurpose,

      margin: `${multiPurpose} auto`,
      boxShadow: `rgba(0, 0, 0, 0.1) 0px ${shadowY} ${multiPurpose}`,

      '.text': {
        paddingRight: multiPurpose,
        fontSize: multiPurpose,
      },

      '.like .count': {
        minWidth: minWidthLikeCount,
        paddingRight: paddingRightLikeCount,
        fontSize: fontSizeLikeCount,
      },
    }),
  })}

  box-sizing: border-box;
  background: ${cssVar('--color-primary-text')};

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  font-family: ${cssVar('--font-feedbax-tertiary')};
  text-align: justify;

  &:first-of-type {
    margin-top: 0;
  }

  .text {
    flex: 1 1 auto;
    color: ${cssVar('--color-feedbax-primary')};
  }

  .like {
    flex: 0 0 auto;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .count {
      color: ${cssVar('--color-feedbax-primary')};
      text-align: right;
    }
  }
`;

export const stylesAnswerFirst = css`
  margin-top: 0;
`;
