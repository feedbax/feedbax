/** @jsx jsx */

import React from 'react';
import useTranslation from '~hooks/i18n/use-translation';

import { jsx } from '@emotion/react';
import { stylesTool } from './styles';

import { graphql, useStaticQuery } from 'gatsby';

import Img from 'gatsby-image';

import type { QueryData } from './types';

const YourTool = React.memo(
  () => {
    const data = useStaticQuery<QueryData>(query);
    const { t } = useTranslation();

    return (
      <div css={stylesTool}>
        <div className="text">
          {t('home', 'your-tool')}
        </div>

        <Img
          className="image"
          fluid={data.file.childImageSharp.fluid}
          imgStyle={{ objectFit: 'contain' }}
          alt="tool preview"
        />
      </div>
    );
  },
);

export default YourTool;

const query = graphql`
  {
    file(relativePath: { eq: "feedbax_mockup.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`;
