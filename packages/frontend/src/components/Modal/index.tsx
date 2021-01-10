import React from 'react';
import { createPortal } from 'react-dom';

import { motion, AnimatePresence } from 'framer-motion';

import { useFela } from 'react-fela';
import { rules } from './styles';

import type { Variants } from 'framer-motion';

type MenuPortalProps = {
  isOpen: boolean;
  children: React.ReactNode;
  onBackdropClick?: () => void;
};

const isSSR = typeof window === 'undefined';

const variants: Variants = {
  initial: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
    WebkitBackdropFilter: 'blur(0px)',
  },

  animate: {
    opacity: 1,
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
  },

  exit: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
    WebkitBackdropFilter: 'blur(0px)',
  },
};

const Modal = React.memo(
  (props: MenuPortalProps) => {
    const { isOpen, onBackdropClick } = props;
    const { children } = props;

    const { css } = useFela({
      isClickable: typeof onBackdropClick !== 'undefined',
    });

    const $toggleOpen = () => {
      if (!onBackdropClick) return;
      onBackdropClick();
    };

    if (isSSR) return <></>;

    return createPortal((
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={css(rules.portal, rules.backdrop)}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
          >
            { /* eslint-disable jsx-a11y/no-static-element-interactions */ }
            { /* eslint-disable jsx-a11y/click-events-have-key-events */ }
            <div
              className={css(rules.background, rules.backdrop)}
              onClick={$toggleOpen}
            />
            { /* eslint-enable jsx-a11y/no-static-element-interactions */ }
            { /* eslint-enable jsx-a11y/click-events-have-key-events */ }

            {children}
          </motion.div>
        )}
      </AnimatePresence>
    ), document.body);
  },
);

export default Modal;
