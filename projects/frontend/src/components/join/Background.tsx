/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from "react"
import { jsx, ClassNames } from "@emotion/react"

import { graphql, useStaticQuery } from "gatsby"
import Img, { FluidObject } from "gatsby-image"

type Data = {
  background_landscape: {
    childImageSharp: {
      fluid: FluidObject
    }
  }

  background_portrait: {
    childImageSharp: {
      fluid: FluidObject
    }
  }
}

const query = graphql`
  {
    background_landscape: file(
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

    background_portrait: file(relativePath: { eq: "background_portrait.jpg" }) {
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
`

export default function Background() {
  const data = useStaticQuery<Data>(query)

  return (
    <ClassNames>
      {({ css }) => (
        <Img
          fluid={[
            {
              ...data.background_landscape.childImageSharp.fluid,
              media: "(orientation: landscape)",
            },
            {
              ...data.background_portrait.childImageSharp.fluid,
              media: "(orientation: portrait)",
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
  )
}
