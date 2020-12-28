import { css } from '@emotion/react';
import { cssVar, fluidRange } from '~lib/css-helper';

export const stylesEventHeader = css`
  position: relative;
  background-color: ${cssVar('--color-feedbax-secondary')};

  .content {
    position: relative;
    width: 100%;
    margin: 0 auto;

    ${fluidRange({
      screen: ['20rem', '120rem', '240rem'] as const,

      sizes: [
        ['33.75rem', '33.75rem', '67.5rem'],
        ['1.63rem',  '1.63rem',  '3.25rem'],
      ] as const,

      css: ([maxWidth, paddingTop]) => ({
        maxWidth,
        paddingTop,
      }),
    })}
  }
`;

export const stylesEvent = css`
  position: relative;
  display: block;

  max-height: 100vh;
  max-height: calc(var(--vh, 1vh) * 100);

  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);

  overflow: hidden;
  display: flex;
  flex-direction: column;

  .scroll-container {
    flex: 1 1 auto;
    overflow-y: scroll;
    overflow-x: hidden;
    touch-action: pan-y;
  }

  .toolbar {
    flex: 0 0 auto;
    width: 100%;
    height: 60px;
    background: ${cssVar('--color-feedbax-primary')};
  }
`;
