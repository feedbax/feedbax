/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from "react";
import { Link } from "gatsby";

import isEqual from "lodash.isequal";

import { jsx, css } from "@emotion/react";
import { colors } from "~theme";

import IconExitApp from "~assets/images/icons/exit_app.inline.svg";

import IconHeartFilled from "~assets/images/icons/favorite_filled.inline.svg";
import IconHeartOutline from "~assets/images/icons/favorite_outline.inline.svg";

import IconClockFilled from "~assets/images/icons/clock_filled.inline.svg";
import IconClockOutline from "~assets/images/icons/clock_outline.inline.svg";

import IconPersonFilled from "~assets/images/icons/person_filled.inline.svg";
import IconPersonOutline from "~assets/images/icons/person_outline.inline.svg";

import type { CSSInterpolation } from "@emotion/serialize";
import type { Colors } from "~theme";

export type Icons = "heart" | "exit" | "clock" | "person";
export type Variants = "none" | "filled" | "outline";

type IconButtonColors = {
  icon: Colors;
  background: Colors;
};

type Props = {
  color?: IconButtonColors;
  icon: Icons;
  variant?: Variants;
  size?: number;
  to?: string;
  styles?: CSSInterpolation;
};

const defaultColors: IconButtonColors = {
  icon: "third",
  background: "second",
};

const IconButton = React.memo((props: Props) => {
  const { icon, variant, to } = props;
  const { styles = {} } = props;
  const { color = defaultColors } = props;

  const Icon = getIcon(icon, variant);
  const $styles = [getStyles(props), css(styles)];

  if (to) {
    return (
      <Link to={to} css={$styles}>
        <Icon fill={colors[color.icon]} />
      </Link>
    );
  } else {
    return (
      <button css={$styles}>
        <Icon fill={colors[color.icon]} />
      </button>
    );
  }
}, isEqual);

export default IconButton;

const getIcon = (icon: Icons, variant: Variants = "none") => {
  switch (`${icon}_${variant}`) {
    case "exit_none":
    case "exit_filled":
    case "exit_outline": {
      return IconExitApp;
    }

    case "heart_none":
    case "heart_filled": {
      return IconHeartFilled;
    }

    case "heart_outline": {
      return IconHeartOutline;
    }

    case "clock_none":
    case "clock_filled": {
      return IconClockFilled;
    }

    case "clock_outline": {
      return IconClockOutline;
    }

    case "person_none":
    case "person_filled": {
      return IconPersonFilled;
    }

    case "person_outline": {
      return IconPersonOutline;
    }

    default: {
      return IconHeartFilled;
    }
  }
};

const getStyles = (props: Props) => {
  const { size = 28 } = props;
  const { color = defaultColors } = props;

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

    background-color: ${colors[color.background]};
    box-shadow: ${shadowXY}px ${shadowXY}px ${shadowBlur}px rgba(0, 0, 0, 0.18),
      -${shadowXY}px -${shadowXY}px ${shadowBlur}px rgba(255, 255, 255, 0.18);

    svg {
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
