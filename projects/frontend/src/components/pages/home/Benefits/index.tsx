/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React, { useCallback } from 'react';

import { jsx } from '@emotion/react';
import { stylesBenefit, stylesBenefits } from './styles';

import { benefits } from './const';

import { graphql, useStaticQuery } from 'gatsby';

import Img from 'gatsby-image';

import type { Benefit, QueryData } from './types';
import allowHyphens from '~components/AllowHyphens';

const Benefits = React.memo(
  () => {
    const data = useStaticQuery<QueryData>(query);
    const renderBenefit = useCallback(
      ({ image, text }: Benefit) => (
        <div css={stylesBenefit} key={image}>
          <Img className="image" fluid={data[image].childImageSharp.fluid} />
          <allowHyphens.div className="text">{text.content}</allowHyphens.div>
        </div>
      ), [data],
    );

    return (
      <div css={stylesBenefits}>
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
