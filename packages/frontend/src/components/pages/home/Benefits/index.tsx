import React, { useCallback } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { benefits } from './const';

import Img from 'gatsby-image';

import type { Benefit, QueryData } from './types';

const Benefits = React.memo(
  () => {
    const data = useStaticQuery<QueryData>(query);
    const renderBenefit = useCallback(
      ({ image, text }: Benefit) => (
        <div key={image}>
          <Img className="image" fluid={data[image].childImageSharp.fluid} />
          <div className="text">{text.content}</div>
        </div>
      ), [data],
    );

    return (
      <div>
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
