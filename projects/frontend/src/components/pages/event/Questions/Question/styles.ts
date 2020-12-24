import { css } from '@emotion/react';
import { fluidRange } from '~lib/css-helper';
import { colors } from '~theme';

export const stylesQuestion = css`
  position: absolute;

  width: 100%;
  top: 0;

  color: ${colors.first};
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  user-select: none;

  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      ['1.63rem', '1.63rem', '3.25rem'],
      ['1.25rem', '1.5rem',  '3rem'],
      ['0.63rem', '0.63rem', '1.25rem'],
      ['0.06rem', '0.06rem', '0.13rem'],
    ] as const,

    css: ([paddingX, fontSize, spacing, borderSize]) => ({
      padding: `0 ${paddingX}`,

      fontSize,
      lineHeight: fontSize,

      '.text': {
        paddingLeft: spacing,
        marginLeft: spacing,
        borderLeft: `${borderSize} solid ${colors.first}`,
      },
    }),
  })}

  .number {
    display: block;
    font-family: "Klinic Slab";
    font-weight: bold;
  }

  .text {
    display: block;
    font-family: "Klinic Slab";
    font-weight: bold;
    text-align: justify;
  }
`;

export const stylesQuestionCurrent = css`
  position: relative;

  top: 0;
  left: 0;

  z-index: 2;
`;
