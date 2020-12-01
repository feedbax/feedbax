/** @jsx jsx */

import "react"

import { jsx, css } from "@emotion/react"
import { between } from "polished"
import { colors } from "~theme"

import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

export default function YourTool() {
  const data = useStaticQuery(query)

  return (
    <div css={stylesTool}>
      <div className="text">Das Umfrage-Tool für deine Veranstaltung.</div>

      <Img
        className="image"
        fluid={data.file.childImageSharp.fluid}
        imgStyle={{ objectFit: "contain" }}
        alt="tool preview"
      />
    </div>
  )
}

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
`

const stylesTool = css`
  position: relative;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  margin-top: 50px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .text {
    flex: 0 0 0;
    position: relative;

    font-family: "Klinic Slab";
    font-style: normal;
    font-weight: normal;
    font-size: ${between("32px", "58px", "300px", "1400px")};

    color: ${colors.third};

    text-align: right;
    padding-right: 60px;
    box-sizing: border-box;
  }

  .image {
    flex: 1 1 auto;

    position: relative;
    display: block;
    width: 50%;
    max-width: 600px;
  }

  @media (max-width: 800px) {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;

    .text {
      max-width: 100%;
      padding-right: 0;
      margin-top: 50px;
      text-align: center;
    }

    .image {
      width: 100%;
    }
  }
`
