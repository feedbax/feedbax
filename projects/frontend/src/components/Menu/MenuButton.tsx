/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React, { useState } from "react";

import { jsx, css } from "@emotion/react";

import IconButton, { Icons } from "~components/IconButton";
import MenuPortal from "./MenuPortal";

import { feedbax } from "@feedbax/api";

import type { IconButtonProps } from "~components/IconButton";

console.log({ feedbax });

type MenuButtonProps = {
  color?: IconButtonProps["color"];
};

const MenuButton = React.memo((props: MenuButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const { color } = props;

  return (
    <>
      <MenuPortal isOpen={isOpen} toggleOpen={toggleOpen} />
      <IconButton
        color={color}
        styles={stylesMenuButton}
        icon={Icons.Menu}
        onClick={toggleOpen}
      />
    </>
  );
});

export default MenuButton;

const stylesMenuButton = css`
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 999 !important;
`;
