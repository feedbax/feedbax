/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React, { useState } from 'react';

import { jsx } from '@emotion/react';
import { stylesMenuButton } from './styles';

import IconButton, { Icons } from '~components/IconButton';
import MenuPortal from '../MenuPortal';

import type { IconButtonProps } from '~components/IconButton';

import { feedbax } from '@feedbax/api';

console.log({ feedbax });

type MenuButtonProps = {
  color?: IconButtonProps['color'];
};

const MenuButton = React.memo(
  (props: MenuButtonProps) => {
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
          ariaLabel="Open menu"
        />
      </>
    );
  },
);

export default MenuButton;