/** @jsx jsx */

import React from 'react';
import useTranslation from '~hooks/i18n/use-translation';

import { jsx, css } from '@emotion/react';
import { between } from 'polished';
import { colors } from '~theme';

import Img from 'gatsby-image';
import { useStaticQuery, graphql } from 'gatsby';

const YourTool = React.memo(
  () => {
    const data = useStaticQuery(query);
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

const stylesTool = css`
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 50px;
  margin-top: ${between('50px', '100px', '300px', '1400px')};

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .text {
    flex: 1 0 0;
    position: relative;

    font-family: "Klinic Slab";
    font-style: normal;
    font-weight: normal;
    font-size: ${between('32px', '58px', '300px', '1400px')};

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
`;
