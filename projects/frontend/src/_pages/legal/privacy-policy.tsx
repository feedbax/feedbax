/** @jsx jsx */

import React from 'react';

import { jsx, css } from '@emotion/react';
import { colors } from '~theme';
import { between } from 'polished';

import GlobalStyles from '~components/GlobalStyles';

import Footer from '~components/Footer';
import Logo from '~components/Logo';
import MenuButton from '~components/Menu';
import { graphql } from 'gatsby';

import type { Query } from '~graphql-types';

type Props = {
  data: Query;
};

export default function PrivacyPolicy ({ data }: Props): JSX.Element {
  const __html = data.translationMarkdown?.data ?? '';

  return (
    <div css={stylesLegal}>
      <GlobalStyles />
      <MenuButton color={{ background: 'first' }} />

      <Logo />

      { /* eslint-disable-next-line react/no-danger */ }
      <div className="content" dangerouslySetInnerHTML={{ __html }} />

      <Footer />
    </div>
  );
}

export const query = graphql`
  query Markdown($locale: String = "de") {
    translationMarkdown(locale: {eq: $locale}, file: {eq: "~privacy-policy.md"}) {
      data
    }
  }
`;

const stylesLegal = css`
  font-family: "Roboto Slab";

  position: relative;
  background-color: ${colors.first};

  color: ${colors.third};
  text-align: left;

  padding-top: ${between('1.5rem', '2.5rem', '20rem', '160rem')};

  * {
    color: ${colors.third};
  }

  .content {
    margin: ${between('1rem', '1.5rem', '20rem', '160rem')} auto;
    font-size: ${between('1rem', '1.5rem', '20rem', '160rem')};
    max-width: ${between('25rem', '50rem', '20rem', '160rem')};
    text-align: justify;

    margin: 60px auto;
    padding: 0 20px;
    box-sizing: border-box;
  }
`;
