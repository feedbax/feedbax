import { css } from '@emotion/react';
import { colors } from '~theme';
import { between } from 'polished';

export const stylesMore = css`
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  padding-top: ${between('96px', '190px', '320px', '2560px')};
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

  padding-top: ${between('1.5rem', '2.5rem', '20rem', '160rem')};
`;

export const stylesTitleAndLogin = css`
  box-sizing: border-box;
  padding: 0 25px;
`;
