/** @jsx jsx */

import React from "react";
import isEqual from "lodash.isequal";

import { jsx, css } from "@emotion/react";
import { CSSInterpolation } from "@emotion/serialize";
import { between } from "polished";

import logo from "~assets/images/logo.svg";
import logoNoText from "~assets/images/logo_no_text.svg";
import logoNoShadowAndText from "~assets/images/logo_no_shadow_no_text.svg";

import LocaleLink from "~components/i18n/LocaleLink";

type Variant = "text" | "no-text" | "no-shadow-and-text";

type Props = {
  styles?: CSSInterpolation;
  variant?: Variant;
  link?: string;
};

const Logo = React.memo((props: Props) => {
  const { styles = {} } = props;
  const { variant = "text" } = props;
  const { link = "/" } = props;

  return (
    <LocaleLink to={link}>
      <div css={[stylesImageWrapper(variant), styles]}>
        <img css={stylesImage} src={getSrc(variant)} />
      </div>
    </LocaleLink>
  );
}, isEqual);

export default Logo;

const getSrc = (variant: Variant) => {
  switch (variant) {
    case "no-shadow-and-text": {
      return logoNoShadowAndText;
    }

    case "no-text": {
      return logoNoText;
    }

    default:
    case "text": {
      return logo;
    }
  }
};

const stylesText = css`
  height: ${between("116px", "155px", "300px", "1400px")};
  width: ${between("90px", "120px", "300px", "1400px")};
  max-height: 155px;
  max-width: 120px;
`;

const stylesSquare = css`
  height: 120px;
  width: 120px;
  max-height: 120px;
  max-width: 120px;
`;

const stylesImageWrapper = (variant: Variant = "text") => css`
  position: relative;
  display: block;
  overflow: hidden;
  margin: 0 auto;

  ${variant === "text" ? stylesText : stylesSquare}
`;

const stylesImage = css`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center center;
`;
