/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React, { useRef } from 'react';
import { createPortal } from 'react-dom';

import { motion, AnimatePresence } from 'framer-motion';

import { Global, css, jsx } from '@emotion/react';
import { stylesPortal } from './styles';

import type { Variants } from 'framer-motion';
import type { CSSInterpolation } from '@emotion/serialize';

type MenuPortalProps = {
  isOpen: boolean;
  children: React.ReactNode;
  onBackdropClick?: () => void;
};

type _MouseEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

const isSSR = typeof window === 'undefined';

const variants: Variants = {
  initial: { opacity: 0, backdropFilter: 'blur(0px)' },
  animate: { opacity: 1, backdropFilter: 'blur(5px)' },
  exit: { opacity: 0, backdropFilter: 'blur(0px)' },
};

const Modal = React.memo(
  (props: MenuPortalProps) => {
    const { isOpen, onBackdropClick } = props;
    const { children } = props;

    const backdropRef = useRef<HTMLDivElement>(null);

    const stylesBackdrop: CSSInterpolation = (
      onBackdropClick
        ? ({ cursor: 'pointer' })
        : ({ cursor: 'default' })
    );

    const $toggleOpen = (e: _MouseEvent) => {
      if (!onBackdropClick) return;
      if (backdropRef.current !== e.target) return;

      onBackdropClick();
    };

    if (isSSR) return <></>;

    return createPortal((
      <AnimatePresence>
        {isOpen && (
          <>
            <Global
              styles={css`
                body {
                  overflow: hidden;
                }
              `}
            />

            <motion.div
              css={css([stylesPortal, stylesBackdrop])}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}
              ref={backdropRef}
              onClick={$toggleOpen}
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    ), document.body);
  },
);

export default Modal;
