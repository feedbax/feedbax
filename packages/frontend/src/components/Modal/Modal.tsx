import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Portal from './Portal';
import styles from './styles.module.scss';

import type { Variants, Transition } from 'framer-motion';

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

const transition: Transition = {
  duration: 0.4,
};

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
};

export default memo(
  function Modal({ children, isOpen }: ModalProps) {
    return (
      <Portal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={styles.container}
              transition={transition}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className={styles.backdrop} />

              { children }
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    );
  },
);
