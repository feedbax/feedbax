/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from "react";
import { Link } from "gatsby";

import isEqual from "lodash.isequal";

import { jsx, css } from "@emotion/react";
import { colors } from "~theme";

import iconExitApp from "~assets/images/icons/exit_app.svg";

import iconHeartFilled from "~assets/images/icons/favorite_filled.svg";
import iconHeartOutline from "~assets/images/icons/favorite_outline.svg";

import iconClockFilled from "~assets/images/icons/clock_filled.svg";
import iconClockOutline from "~assets/images/icons/clock_outline.svg";

import iconPersonFilled from "~assets/images/icons/person_filled.svg";
import iconPersonOutline from "~assets/images/icons/person_outline.svg";

import type { CSSInterpolation } from "@emotion/serialize";
import type { Colors } from "~theme";

export type Icons = "heart" | "exit" | "clock" | "person";
export type Variants = "none" | "filled" | "outline";

type Props = {
  color?: Colors;
  icon: Icons;
  variant?: Variants;
  size?: number;
  to?: string;
  styles?: CSSInterpolation;
} & JSX.IntrinsicElements["button"];

const IconButton = React.memo((props: Props) => {
  const { icon, variant, to } = props;
  const { styles = {} } = props;

  const image = <img src={getSrc(icon, variant)} />;
  const $styles = [getStyles(props), css(styles)];

  if (to) {
    return (
      <Link to={to} css={$styles}>
        {image}
      </Link>
    );
  } else {
    return <button css={$styles}>{image}</button>;
  }
}, isEqual);

export default IconButton;

const getSrc = (icon: Icons, variant: Variants = "none") => {
  switch (`${icon}_${variant}`) {
    case "exit_none":
    case "exit_filled":
    case "exit_outline": {
      return iconExitApp;
    }

    case "heart_none":
    case "heart_filled": {
      return iconHeartFilled;
    }

    case "heart_outline": {
      return iconHeartOutline;
    }

    case "clock_none":
    case "clock_filled": {
      return iconClockFilled;
    }

    case "clock_outline": {
      return iconClockOutline;
    }

    case "person_none":
    case "person_filled": {
      return iconPersonFilled;
    }

    case "person_outline": {
      return iconPersonOutline;
    }

    default: {
      return iconHeartFilled;
    }
  }
};

const getStyles = (props: Props) => {
  const { size = 28, disabled = false } = props;
  const { color = "second" } = props;

  const shadowXY = Math.round(size * 0.1);
  const shadowBlur = Math.round(size * 0.2);

  return css`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 0;
    outline: 0;

    border-radius: 50%;
    transition: transform 0.3s ease 0s;
    cursor: pointer;
    padding: 0;

    width: ${size}px;
    height: ${size}px;

    background-color: ${colors[color]};
    box-shadow: ${shadowXY}px ${shadowXY}px ${shadowBlur}px rgba(0, 0, 0, 0.18),
      -${shadowXY}px -${shadowXY}px ${shadowBlur}px rgba(255, 255, 255, 0.18);

    img {
      padding: 0px;
      position: relative;
      cursor: pointer;
      border-radius: 50%;
      display: flex;
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;
      transition: opacity 0.3s ease 0s;

      width: ${size - 12}px;
      height: ${size - 12}px;
    }
  `;
};
