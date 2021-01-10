import React, { useState } from 'react';
import loadable from '@loadable/component';

import IconButton, { Icons } from '~components/IconButton';
import { rules } from './styles';

import type { IconButtonProps } from '~components/IconButton';

const MenuPortal = loadable(() => import('../MenuPortal'));

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
          icon={Icons.Menu}
          customRule={rules.button}
          onClick={toggleOpen}
          ariaLabel="Open menu"
        />
      </>
    );
  },
);

export default MenuButton;
