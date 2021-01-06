import React from 'react';
import useTranslation from '~hooks/components/I18n/use-translation';

import { useFela } from 'react-fela';
import { rules } from './styles';

import { graphql, useStaticQuery } from 'gatsby';

import Img from 'gatsby-image';

import type { QueryData } from './types';

const YourTool = React.memo(
  () => {
    const { css } = useFela();

    const data = useStaticQuery<QueryData>(query);
    const { t } = useTranslation();

    return (
      <div className={css(rules.tool.container)}>
        <div className={css(rules.tool.text)}>
          {t('home', 'your_tool')}
        </div>

        <Img
          className={css(rules.tool.image)}
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
