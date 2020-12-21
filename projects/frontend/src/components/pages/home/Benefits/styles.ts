import { css } from '@emotion/react';
import { fluidRange } from '~lib/css-helper';
import { colors } from '~theme';

export const stylesBenefit = css`
  position: relative;
  flex: 1 1 auto;
  width: 100%;
  max-width: 33.33%;
  box-sizing: border-box;

  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      ['1.5625rem', '4.125rem', '8.25rem'],
      ['0.625rem',  '1.625rem', '3.25rem'],
      ['1.5rem',    '2.375rem', '4.75rem'],
      ['1.125rem',  '1.625rem', '3.25rem'],
      ['1rem',      '1.25rem',  '2.5rem'],
    ] as const,

    css: ([
      paddingBenefit,
      marginTopBenefit,
      fontSizeText,
      marginTopText,
      marginTopCodeAndSmall,
    ]) => ({
      padding: paddingBenefit,
      marginTop: marginTopBenefit,

      '.text': {
        fontSize: fontSizeText,
        marginTop: marginTopText,

        'code, small': {
          marginTop: marginTopCodeAndSmall,
        },
      },
    }),
  })}

  @media (max-width: 86rem) {
    max-width: 50%;
  }

  @media (max-width: 37.5rem) {
    max-width: 100%;
  }

  .text {
    font-family: "Klinic Slab";
    font-style: normal;
    font-weight: normal;
    color: ${colors.third};
    text-align: center;

    code {
      display: block;
      font-size: 0.45em;
    }

    small {
      display: block;

      font-family: "Klinic Slab Book";
      font-size: 0.65em;

      ul {
        margin: 0;
        margin-block: 0;
        padding-inline: 0;
      }
    }
  }
`;

export const stylesBenefits = css`
  position: relative;
  width: 100%;

  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      ['3rem',  '5rem',     '10rem'],
      ['20rem', '97.5rem',  '195rem'],
    ] as const,

    css: ([margin, maxWidth]) => ({
      margin: `${margin} auto`,
      maxWidth,
    }),
  })}

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  flex-wrap: wrap;
`;
