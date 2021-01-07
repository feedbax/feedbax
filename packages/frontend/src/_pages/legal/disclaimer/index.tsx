/** @jsx jsx */

import React from 'react';
import { graphql } from 'gatsby';

import { jsx } from '@emotion/react';
import { stylesLegal } from './styles';

import Footer from '~components/Footer';
import Logo from '~components/Logo';
import MenuButton from '~components/Menu';
import hyphens from '~components/Hyphens';

import type { PrivacyPolicyProps } from './types';

const Disclaimer = React.memo(
  ({ data }: PrivacyPolicyProps): JSX.Element => (
    <div css={stylesLegal}>
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

export default Disclaimer;

export const query = graphql`
  query {
    translationMarkdown(locale: {eq: "en"}, file: {eq: "~disclaimer.md"}) {
      data
    }
  }
`;
