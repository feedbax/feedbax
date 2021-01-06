import React from 'react';
import useTranslation from '~hooks/components/I18n/use-translation';

import rules from './styles';

import { graphql, useStaticQuery } from 'gatsby';

import Img from 'gatsby-image';

import type { QueryData } from './types';
import { useFela } from 'react-fela';

const YourTool = React.memo(
  () => {
    const { css } = useFela();

    const data = useStaticQuery<QueryData>(query);
    const { t } = useTranslation();

    return (
      <div className={css(rules.tool)}>
        <div className={css(rules.toolText)}>
          {t('home', 'your_tool')}
        </div>

        <Img
          className={css(rules.toolImage)}
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
