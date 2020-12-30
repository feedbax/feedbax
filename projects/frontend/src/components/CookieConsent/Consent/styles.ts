import { css } from '@emotion/react';
import { cssVar, fluidRange } from '~lib/css-helper';

export const stylesConsentContent = css`
  flex: 0 1 auto;

  font-family: ${cssVar('--font-feedbax-secondary')};
  text-align: justify;

  padding: 1rem;
  box-sizing: border-box;

  max-height: 100%;
  overflow: auto;

  color: ${cssVar('--color-primary-text')};

  & > * {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
  }

  a {
    color: ${cssVar('--color-primary-text')};
  }

  ${fluidRange({
    screen: ['20rem', '120rem', '240rem'] as const,

    sizes: [
      ['20rem', '40rem',  '80rem'],
      ['1rem',  '1.5rem', '3rem'],
    ] as const,

    css: ([maxWidth, fontSize]) => ({ maxWidth, fontSize }),
  })}
`;

export const stylesLanguageChooser = css`
  padding-top: 1em;
  margin-top: 2em;
  font-size: 0.8em;

  color: ${cssVar('--color-primary-text')};
  border-top: 1px solid ${cssVar('--color-primary-text')};

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  & > * {
    flex: 0 0 auto;
    padding: 0 0.4em;
    border-right: 1px solid ${cssVar('--color-primary-text')};
  }

  & > *:last-child {
    border: 0;
  }
`;
