import { css } from '@emotion/react';
import { colors } from '~theme';
import { fluidRange } from '~lib/css-helper';

export const stylesMore = css`
  position: relative;
  padding: 20px;
  box-sizing: border-box;

  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,
    sizes: [['6rem', '11.875rem', '23.75rem']] as const,
    css: ([paddingTop]) => ({ paddingTop }),
  })}
`;

export const stylesFront = css`
  position: relative;

  min-height: 100vh;
  min-height: calc(100vh + 0.25 * 100vw);
  min-height: calc((var(--vh, 1vh) * 100) + 0.25 * 100vw);

  background-color: ${colors.first};

  & * {
    z-index: 1;
  }
`;

export const stylesFrontContent = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);

  box-sizing: border-box;

  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,
    sizes: [['1.5rem', '2.5rem', '5rem']] as const,
    css: ([paddingTop]) => ({ paddingTop }),
  })}
`;

export const stylesTitleAndLogin = css`
  box-sizing: border-box;
  padding: 0 25px;
`;
