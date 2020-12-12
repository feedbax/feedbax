/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React, { useEffect, useState } from "react";
import isEqual from "lodash.isequal";

import { jsx, css } from "@emotion/react";
import LocaleLink from "~components/I18n/LocaleLink";

import { colors } from "~theme";

import type { CSSInterpolation } from "@emotion/serialize";
import type { Colors } from "~theme";

export enum Icons {
  Heart,
  Exit,
  Clock,
  Person,
  Menu,
  Close,
  ArrowBack,
}

export enum Variants {
  None,
  Filled,
  Outline,
}

type IconButtonColors = {
  icon?: Colors;
  background?: Colors;
};

export type IconButtonProps = {
  icon: Icons;
  variant?: Variants;

  size?: number;
  neumorphism?: boolean;
  color?: IconButtonColors;

  styles?: CSSInterpolation;

  to?: string;
  onClick?: (event: React.MouseEvent<unknown, MouseEvent>) => void;
};

type SVGIcon = React.FC<React.SVGProps<SVGSVGElement>>;
type IconState = { Component: SVGIcon };

const defaultColors = {
  icon: "third",
  background: "second",
} as const;

const NoSvg: SVGIcon = () => <svg />;

const IconButton = React.memo((props: IconButtonProps) => {
  const { icon, variant } = props;
  const { styles = {} } = props;
  const { color = {} } = props;

  const { to, onClick } = props;
  const $styles = [getStyles(props), css(styles)];

  const [IconLazy, setIconLazy] = useState<IconState>({ Component: NoSvg });
  const Icon = <IconLazy.Component fill={colors[color.icon ?? defaultColors.icon]} />;

  useEffect(() => {
    getIcon(icon, variant).then((icon) =>
      setIconLazy({ Component: icon.default }),
    );
  }, [icon, variant]);

  if (to) {
    return (
      <LocaleLink to={to} css={$styles}>
        {Icon}
      </LocaleLink>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} css={$styles}>
        {Icon}
      </button>
    );
  }

  return <button css={$styles}>{Icon}</button>;
}, isEqual);

export default IconButton;

const getIcon = (icon: Icons, variant: Variants = Variants.None) => {
  switch (`${icon}_${variant}`) {
    case `${Icons.Exit}_${Variants.None}`:
    case `${Icons.Exit}_${Variants.Filled}`:
    case `${Icons.Exit}_${Variants.Outline}`: {
      return import("~assets/images/icons/exit_app.inline.svg");
    }

    case `${Icons.ArrowBack}_${Variants.None}`:
    case `${Icons.ArrowBack}_${Variants.Filled}`:
    case `${Icons.ArrowBack}_${Variants.Outline}`: {
      return import("~assets/images/icons/arrow_back.inline.svg");
    }

    case `${Icons.Close}_${Variants.None}`:
    case `${Icons.Close}_${Variants.Filled}`:
    case `${Icons.Close}_${Variants.Outline}`: {
      return import("~assets/images/icons/close.inline.svg");
    }

    case `${Icons.Menu}_${Variants.None}`:
    case `${Icons.Menu}_${Variants.Filled}`:
    case `${Icons.Menu}_${Variants.Outline}`: {
      return import("~assets/images/icons/menu.inline.svg");
    }

    case `${Icons.Heart}_${Variants.None}`:
    case `${Icons.Heart}_${Variants.Filled}`: {
      return import("~assets/images/icons/favorite_filled.inline.svg");
    }

    case `${Icons.Heart}_${Variants.Outline}`: {
      return import("~assets/images/icons/favorite_outline.inline.svg");
    }

    case `${Icons.Clock}_${Variants.None}`:
    case `${Icons.Clock}_${Variants.Filled}`: {
      return import("~assets/images/icons/clock_filled.inline.svg");
    }

    case `${Icons.Clock}_${Variants.Outline}`: {
      return import("~assets/images/icons/clock_outline.inline.svg");
    }

    case `${Icons.Person}_${Variants.None}`:
    case `${Icons.Person}_${Variants.Filled}`: {
      return import("~assets/images/icons/person_filled.inline.svg");
    }

    case `${Icons.Person}_${Variants.Outline}`: {
      return import("~assets/images/icons/person_outline.inline.svg");
    }

    default: {
      return import("~assets/images/icons/close.inline.svg");
    }
  }
};

const getStyles = (props: IconButtonProps) => {
  const { size = 28 } = props;
  const { color = {} } = props;
  const { neumorphism = true } = props;

  const shadowXY = Math.round(size * 0.1);
  const shadowBlur = Math.round(size * 0.2);

  const shadow = css({
    boxShadow: ` ${shadowXY}px  ${shadowXY}px ${shadowBlur}px rgba(0, 0, 0, 0.18),
                -${shadowXY}px -${shadowXY}px ${shadowBlur}px rgba(255, 255, 255, 0.18)`,
  });

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

    background-color: ${colors[color.background ?? defaultColors.background]};
    ${neumorphism ? shadow : null}

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
