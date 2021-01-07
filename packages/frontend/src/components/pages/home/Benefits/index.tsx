import React, { useCallback } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { benefits } from './const';

import { useFela } from 'react-fela';
import { rules } from './styles';

import Img from 'gatsby-image';

import type { Benefit, QueryData } from './types';

const Benefits = React.memo(
  () => {
    const { css } = useFela();

    const data = useStaticQuery<QueryData>(query);
    const renderBenefit = useCallback(
      ({ image, text }: Benefit) => (
        <div key={image} className={css(rules.benefit.container)}>
          <Img className={css(rules.benefit.image)} fluid={data[image].childImageSharp.fluid} />
          <div className={css(rules.benefit.text)}>{text.content}</div>
        </div>
      ), [css, data],
    );

    return (
      <div className={css(rules.benefits.container)}>
        {benefits.map(renderBenefit)}
      </div>
    );
  },
);

export default Benefits;

const query = graphql`
  {
    benefit_1: file(relativePath: { eq: "feedbax_1.png" }) {
      childImageSharp {
        fluid(srcSetBreakpoints: [300, 400, 500, 600]) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }

    benefit_2: file(relativePath: { eq: "feedbax_2.png" }) {
      childImageSharp {
        fluid(srcSetBreakpoints: [300, 400, 500, 600]) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }

    benefit_3: file(relativePath: { eq: "feedbax_3.png" }) {
      childImageSharp {
        fluid(srcSetBreakpoints: [300, 400, 500, 600]) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }

    benefit_4: file(relativePath: { eq: "feedbax_4.png" }) {
      childImageSharp {
        fluid(srcSetBreakpoints: [300, 400, 500, 600]) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }

    benefit_5: file(relativePath: { eq: "feedbax_5.png" }) {
      childImageSharp {
        fluid(srcSetBreakpoints: [300, 400, 500, 600]) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }

    benefit_6: file(relativePath: { eq: "feedbax_6.png" }) {
      childImageSharp {
        fluid(srcSetBreakpoints: [300, 400, 500, 600]) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`;
