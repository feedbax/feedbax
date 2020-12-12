/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React, { useCallback } from "react";
import { Translation } from "~i18n";

import { jsx, css } from "@emotion/react";
import { between } from "polished";
import { colors } from "~theme";

import Img, { FluidObject } from "gatsby-image";
import { useStaticQuery, graphql } from "gatsby";

const benefits = [
  {
    image: "benefit_1",
    text: {
      align: "center",
      content: (
        <Translation>{
          t => <>{t("frontpage", "benefit-1")}</>
        }</Translation>
      ),
    },
  },

  {
    image: "benefit_2",
    text: {
      align: "center",
      content: (
        <Translation>{
          t => <>{t("frontpage", "benefit-2")}</>
        }</Translation>
      ),
    },
  },

  {
    image: "benefit_3",
    text: {
      align: "center",
      content: (
        <Translation>{
          t => <>{t("frontpage", "benefit-3")}</>
        }</Translation>
      ),
    },
  },

  {
    image: "benefit_4",
    text: {
      align: "left",
      content: (
        <Translation>
          {(t) => (
            <>
              {t("frontpage", "benefit-4", "title")}

              <small>
                <ul>
                  <li>{t("frontpage", "benefit-4", "content-1")}</li>
                  <li>{t("frontpage", "benefit-4", "content-2")}</li>
                </ul>
              </small>
            </>
          )}
        </Translation>
      ),
    },
  },

  {
    image: "benefit_5",
    text: {
      align: "left",
      content: (
        <Translation>
          {(t) => (
            <>
              {t("frontpage", "benefit-5", "title")}
              <small>{t("frontpage", "benefit-5", "content-1")}</small>
              <code>{t("frontpage", "benefit-5", "content-2")}</code>
            </>
          )}
        </Translation>
      ),
    },
  },

  {
    image: "benefit_6",
    text: {
      align: "left",
      content: (
        <Translation>
          {(t) => (
            <>
              {t("frontpage", "benefit-6", "title")}
              <small>{t("frontpage", "benefit-6", "content-1")}</small>
            </>
          )}
        </Translation>
      ),
    },
  },
] as const;

type Benefit = typeof benefits[number];

type Data = {
  [P in typeof benefits[number]["image"]]: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
};

const createRenderBenefit = (data: Data) => ({ image, text }: Benefit) => (
  <div css={stylesBenefit} key={image}>
    <Img className="image" fluid={data[image].childImageSharp.fluid} />
    <div className={`text ${text.align}`}>{text.content}</div>
  </div>
);

export default function Benefits() {
  const data = useStaticQuery(query);
  const renderBenefit = useCallback(createRenderBenefit(data), [data]);

  return <div css={stylesBenefits}>{benefits.map(renderBenefit)}</div>;
}

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

const stylesBenefit = css`
  position: relative;
  flex: 1 1 auto;
  width: 100%;
  max-width: 33.33%;

  box-sizing: border-box;
  padding: ${between("25px", "50px", "300px", "1400px")};
  margin-top: ${between("10px", "20px", "300px", "1400px")};

  @media (max-width: 1000px) {
    max-width: 50%;
  }

  @media (max-width: 600px) {
    max-width: 100%;
  }

  .text {
    font-family: "Klinic Slab";
    font-style: normal;
    font-weight: normal;
    font-size: ${between("20px", "28px", "300px", "1400px")};
    color: ${colors.third};

    margin-top: 20px;

    &.left {
      text-align: left;
    }

    &.center {
      text-align: center;
    }

    code {
      display: block;
      margin-top: 20px;
      font-size: 14px;
    }

    small {
      display: block;
      margin-top: 20px;

      font-family: "Klinic Slab Book";
      font-size: ${between("18px", "20px", "300px", "1400px")};
      text-align: left;

      ul {
        margin: 0;
        margin-block: 0;
        padding-inline: 0;
      }
    }
  }
`;

const stylesBenefits = css`
  position: relative;
  width: 100%;
  max-width: 1400px;

  margin: 60px auto;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  flex-wrap: wrap;
`;
