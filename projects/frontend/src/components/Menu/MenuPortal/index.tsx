/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React, { useEffect, useRef, useState } from 'react';
import useMenuItems from '~hooks/other/menu/use-menu-items';

import { jsx } from '@emotion/react';
import { stylesItem, stylesItems } from './styles';
import { stylesShow, stylesHide } from './styles';
import { stylesIconButtonBack, stylesIconButtonClose } from './styles';
import { stylesTabable } from './styles';

import IconButton, { Icons } from '~components/IconButton';
import Modal from '~components/Modal';

import type { MenuItem } from '../types';

type MenuPortalProps = {
  isOpen: boolean;
  toggleOpen: () => void;
};

type _MouseEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;
type _KeyboardEvent = React.KeyboardEvent<HTMLDivElement>;
type Event = _MouseEvent | _KeyboardEvent;

const MenuPortal = React.memo(
  (props: MenuPortalProps) => {
    const { isOpen, toggleOpen } = props;

    const menu = useMenuItems();

    const [items, setItems] = useState(menu);
    const [hasHistory, setHasHistory] = useState(false);
    const itemsHistory = useRef<MenuItem[][]>([]);

    const openItem = (
      (item: MenuItem) => (
        (event: Event) => {
          if ('key' in event) {
            event.preventDefault();
            event.stopPropagation();

            const isSubmit = event.key === 'Enter' || event.key === ' ';
            if (!isSubmit) return;
          }

          if (item.items) {
            itemsHistory.current.push(items);
            setItems(item.items);
          }
        }
      )
    );

    const clickItem = (
      (event: Event) => {
        if ('key' in event) {
          event.preventDefault();
          event.stopPropagation();

          const isSubmit = event.key === 'Enter' || event.key === ' ';
          if (!isSubmit) return;
        }

        event
          .currentTarget
          .getElementsByTagName('a')
          .item(0)
          ?.click();
      }
    );

    const getItemProps = (
      (item: MenuItem, index: number) => ({
        css: [stylesItem, stylesTabable],

        role: 'button',
        tabIndex: 0,

        onClick: item.items ? openItem(item) : clickItem,
        onKeyPress: item.items ? openItem(item) : clickItem,

        ref: (
          index === 0
            ? (el: HTMLElement | null) => el?.focus()
            : null
        ),
      })
    );

    useEffect(() => {
      setHasHistory(itemsHistory.current.length > 0);
    }, [itemsHistory.current.length]);

    return (
      <Modal
        isOpen={isOpen}
        onBackdropClick={toggleOpen}
      >
        <IconButton
          size={38}
          neumorphism={false}
          styles={[stylesIconButtonBack, hasHistory ? stylesShow : stylesHide]}

          icon={Icons.ArrowBack}
          color={{ background: '--color-transparent' }}

          ariaLabel="Previous Items"
          onClick={() => {
            if (hasHistory) {
              const $items = itemsHistory.current.pop();
              setItems($items ?? []);
            }
          }}
        />

        <div css={stylesItems}>
          {items.map((item, i) => (
            <div
              key={item.key}

              // eslint-disable-next-line react/jsx-props-no-spreading
              {...getItemProps(item, i)}
            >
              {item.content}
            </div>
          ))}
        </div>

        <IconButton
          size={38}
          neumorphism={false}
          styles={stylesIconButtonClose}

          icon={Icons.Close}
          color={{ background: '--color-transparent' }}

          ariaLabel="Close Menu"
          onClick={toggleOpen}
        />
      </Modal>
    );
  },
);

export default MenuPortal;
