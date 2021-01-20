import { memo } from 'react';
import { createPortal } from 'react-dom';

import { motion, AnimatePresence } from 'framer-motion';

import { useFela } from 'react-fela';
import { rules } from '@/styles/components/Modal';

import type { Variants } from 'framer-motion';

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

export default memo(
  function Modal (props: ModalPortalProps) {
    const { isOpen, onBackdropClick } = props;
    const { children } = props;

    const isClickable = typeof onBackdropClick !== 'undefined';
    const { css } = useFela({ isClickable });

    const $toggleOpen = () => {
      if (!onBackdropClick) return;
      onBackdropClick();
    };

    if (!process.browser) return <></>;

    return createPortal(
      (
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
      ),

      document.body,
    );
  },
);

export type ModalPortalProps = {
  isOpen: boolean;
  children: React.ReactNode;
  onBackdropClick?: () => void;
};
