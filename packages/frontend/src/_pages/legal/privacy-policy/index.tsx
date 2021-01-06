/** @jsx jsx */

import React from 'react';
import { graphql } from 'gatsby';

import { jsx } from '@emotion/react';
import { stylesLegal } from './styles';

import GlobalStyles from '~components/GlobalStyles';

import Footer from '~components/Footer';
import Logo from '~components/Logo';
import MenuButton from '~components/Menu';
import hyphens from '~components/Hyphens';

import type { PrivacyPolicyProps } from './types';

const PrivacyPolicy = React.memo(
  ({ data }: PrivacyPolicyProps): JSX.Element => (
    <div css={stylesLegal}>
      <GlobalStyles />
      <MenuButton color={{ background: '--color-feedbax-primary' }} />

      <Logo />

      <hyphens.div
        className="content"

        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: data.translationMarkdown?.data ?? '',
        }}
      />

      <Footer />
    </div>
  ),
);

export default PrivacyPolicy;

export const query = graphql`
  query Markdown($locale: String = "de") {
    translationMarkdown(locale: {eq: $locale}, file: {eq: "~privacy-policy.md"}) {
      data
    }
  }
`;
