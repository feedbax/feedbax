/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React from 'react';
import { createPortal } from 'react-dom';

import { motion, AnimatePresence } from 'framer-motion';

import { Global, css, jsx } from '@emotion/react';
import { stylesPortal, stylesBackground } from './styles';

import type { Variants } from 'framer-motion';
import type { CSSInterpolation } from '@emotion/serialize';

type MenuPortalProps = {
  isOpen: boolean;
  children: React.ReactNode;
  onBackdropClick?: () => void;
};

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

    const stylesBackdrop: CSSInterpolation = (
      onBackdropClick
        ? ({ cursor: 'pointer' })
        : ({ cursor: 'default' })
    );

    const $toggleOpen = () => {
      if (!onBackdropClick) return;
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
            >
              { /* eslint-disable jsx-a11y/no-static-element-interactions */ }
              { /* eslint-disable jsx-a11y/click-events-have-key-events */ }
              <div
                css={css([stylesBackground, stylesBackdrop])}
                onClick={$toggleOpen}
              />
              { /* eslint-enable jsx-a11y/no-static-element-interactions */ }
              { /* eslint-enable jsx-a11y/click-events-have-key-events */ }

              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    ), document.body);
  },
);

export default Modal;
