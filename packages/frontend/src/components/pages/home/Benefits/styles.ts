// import { cssVar, fluidRangeFela } from '~lib/css-helper';
// import type { FelaRule } from '~lib/css-helper';

export {};

// export const rules = {
//   stylesBenefit:
// };

/*

export const stylesBenefit = css`
  position: relative;
  flex: 1 1 33.33%;

  width: 100%;
  max-width: 33.33%;

  box-sizing: border-box;
  text-align: center;

  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      ['1.56rem', '4.13rem', '8.25rem'],
      ['0.63rem', '1.63rem', '3.25rem'],
      ['1.5rem',  '2.38rem', '4.75rem'],
      ['1.13rem', '1.63rem', '3.25rem'],
      ['1rem',    '1.25rem', '2.5rem'],
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
    flex: 1 1 50%;
    max-width: 50%;
  }

  @media (max-width: 37.5rem) {
    flex: 1 1 100%;
    max-width: 100%;
  }

  .text {
    font-family: ${cssVar('--font-feedbax-primary')};
    font-style: normal;
    font-weight: normal;
    color: ${cssVar('--color-primary-text')};
    text-align: center;
    display: inline-block;

    ul {
      text-align: left;
    }

    code {
      display: block;
      font-size: 0.45em;
    }

    small {
      display: block;

      font-family: ${cssVar('--font-feedbax-tertiary')};
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
      ['20rem', '90rem',    '180rem'],
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

*/
