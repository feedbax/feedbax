/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import useMenuItems from '~hooks/menu/use-menu-items';

import { motion, AnimatePresence } from 'framer-motion';

import { transparentize } from 'polished';
import { jsx, css } from '@emotion/react';
import { colors } from '~theme';

import IconButton, { Icons } from '~components/IconButton';

import type { Variants } from 'framer-motion';
import type { MenuItem } from './types';

type MenuPortalProps = {
  isOpen: boolean;
  toggleOpen: () => void;
};

type MouseEvent = React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>;

const variants: Variants = {
  initial: { opacity: 0, backdropFilter: 'blur(0px)' },
  animate: { opacity: 1, backdropFilter: 'blur(5px)' },
  exit: { opacity: 0, backdropFilter: 'blur(0px)' },
};

const MenuPortal = React.memo(
  (props: MenuPortalProps) => {
    const { isOpen, toggleOpen } = props;
    const backdropRef = useRef<HTMLDivElement>(null);

    const menu = useMenuItems();

    const [items, setItems] = useState(menu);
    const [hasHistory, setHasHistory] = useState(false);
    const itemsHistory = useRef<MenuItem[][]>([]);

    const $toggleOpen = (e: MouseEvent) => {
      if (backdropRef.current !== e.target) return;

      if (isOpen) {
        setItems(menu);
        itemsHistory.current = [];
      }

      toggleOpen();
    };

    useEffect(() => {
      setHasHistory(itemsHistory.current.length > 0);
    }, [itemsHistory.current.length]);

    return createPortal(
      <AnimatePresence>
        {isOpen && (
        <motion.div
          css={stylesPortal}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4 }}
          ref={backdropRef}
          onClick={$toggleOpen}
        >
          <IconButton
            size={38}
            neumorphism={false}
            styles={[stylesIconButtonBack, hasHistory ? stylesShow : stylesHide]}

            icon={Icons.ArrowBack}
            color={{ background: 'transparent' }}

            onClick={() => {
              if (hasHistory) {
                const $items = itemsHistory.current.pop();
                setItems($items ?? []);
              }
            }}
          />

          <div css={stylesItems}>
            {items.map((item) => (
              <div
                key={item.key}
                css={stylesItem}
                role="button"
                tabIndex={0}

                onClick={() => {
                  if (item.items) {
                    itemsHistory.current.push(items);
                    setItems(item.items);
                  }
                }}

                onKeyDown={() => {
                  if (item.items) {
                    itemsHistory.current.push(items);
                    setItems(item.items);
                  }
                }}
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
            color={{ background: 'transparent' }}

            onClick={toggleOpen}
          />
        </motion.div>
        )}
      </AnimatePresence>,
      document.body,
    );
  },
);

export default MenuPortal;

const stylesPortal = css`
  position: absolute;
  position: fixed;

  left: 0;
  top: 0;
  overflow: hidden;
  z-index: 9999;

  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);

  background-color: ${transparentize(0.2, colors.first)};
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const stylesItems = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin: 0 25px;
  min-width: 300px;
`;

const stylesItem = css`
  padding: 8px 5px;

  color: #fff;
  font-size: 24px;
  line-height: 24px;
  font-family: "Roboto Slab";
  text-decoration: none;

  * {
    color: #fff;
    font-size: 24px;
    line-height: 24px;
    font-family: "Roboto Slab";
    text-decoration: none;
  }
`;

const stylesIconButtonBack = css`
  @media (max-width: 600px) {
    position: absolute;
    top: 25px;
    left: 25px;
  }
`;

const stylesIconButtonClose = css`
  @media (max-width: 600px) {
    position: absolute;
    top: 25px;
    right: 25px;
  }
`;

const stylesHide = css`
  opacity: 0;
`;

const stylesShow = css`
  opacity: 1;
`;
