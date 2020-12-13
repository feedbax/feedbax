/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from 'react';
import { jsx, ClassNames } from '@emotion/react';

import { graphql, useStaticQuery } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

type Data = {
  backgroundLandscape: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };

  backgroundPortrait: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
};

const query = graphql`
  {
    backgroundLandscape: file(
      relativePath: { eq: "background_landscape.jpg" }
    ) {
      childImageSharp {
        fluid(
          traceSVG: { color: "#957b82" }
          maxWidth: 1920
          quality: 100

          srcSetBreakpoints: [
            320
            420
            520
            620
            720
            820
            920
            1020
            1280
            1440
            1600
            1920
          ]
        ) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }

    backgroundPortrait: file(relativePath: { eq: "background_portrait.jpg" }) {
      childImageSharp {
        fluid(
          traceSVG: { color: "#957b82" }
          maxHeight: 1920
          quality: 100

          srcSetBreakpoints: [
            320
            420
            520
            620
            720
            820
            920
            1020
            1280
            1440
            1600
            1920
          ]
        ) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`;

const Background = React.memo(
  () => {
    const data = useStaticQuery<Data>(query);

    return (
      <ClassNames>
        {({ css }) => (
          <Img
            fluid={[
              {
                ...data.backgroundLandscape.childImageSharp.fluid,
                media: '(orientation: landscape)',
              },
              {
                ...data.backgroundPortrait.childImageSharp.fluid,
                media: '(orientation: portrait)',
              },
            ]}

            className={css`
              position: absolute !important;
              width: 100vw;
              height: 100vh;
              height: calc(var(--vh, 1vh) * 100);
              z-index: -2;
            `}
          />
        )}
      </ClassNames>
    );
  },
);

export default Background;
