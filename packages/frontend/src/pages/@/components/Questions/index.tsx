import { memo } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { useStore, selectors } from '@/store';
import { AnimatePresence, motion } from 'framer-motion';

import hyphens from '@/components/Hyphens';
import styles from './style.module.scss';

import type { FeedbaxStore } from '@/store/types';
import type { PanInfo, Variants, Transition } from 'framer-motion';

const transition: Transition = {
  bounce: false,
  ease: 'linear',
  duration: 0.2,
};

const variants = (swipeDirection: number): Variants => ({
  initial: { x: swipeDirection * 200, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: swipeDirection * -200, opacity: 0 },
});

const useCurrentQuestion = (currentQuestionId?: string) => {
  const currentQuestionSelector = useCallback(
    (state: FeedbaxStore) => {
      if (typeof currentQuestionId === 'string') {
        return state.questions[currentQuestionId];
      }

      return undefined;
    },

    [currentQuestionId],
  );

  const currentQuestion = useStore(currentQuestionSelector);

  return currentQuestion;
};

const useDragLock = () => {
  const [locked, setLocked] = useState(false);

  const doLock = useCallback(() => setLocked(true), []);
  const doUnlock = useCallback(() => setLocked(false), []);

  return { locked, doLock, doUnlock };
};

export default memo(
  function Questions() {
    const nextQuestion = useStore(selectors.nextQuestion);
    const previousQuestion = useStore(selectors.previousQuestion);

    const currentQuestionId = useStore(selectors.currentQuestionId);
    const currentQuestionNumber = useStore(selectors.currentQuestionNumber);
    const currentQuestion = useCurrentQuestion(currentQuestionId);

    const [questionHeight, setQuestionHeight] = useState(0);
    const [swipeDirection, setSwipeDirection] = useState(1);
    const { locked, doLock, doUnlock } = useDragLock();

    useEffect(() => console.log('questionHeight', questionHeight), [questionHeight]);
    useEffect(() => console.log('currentQuestion', currentQuestion), [currentQuestion]);

    type DragEndEvent = MouseEvent | TouchEvent | PointerEvent;
    const doSwipe = useCallback((_: DragEndEvent, info: PanInfo) => {
      if (info.delta.x > 0) {
        setSwipeDirection(-1);
        previousQuestion();
      }

      if (info.delta.x < 0) {
        setSwipeDirection(1);
        nextQuestion();
      }
    }, []);

    const getGeight = useCallback((el: HTMLDivElement | null) => {
      if (typeof el?.clientHeight === 'number') {
        setQuestionHeight(el?.clientHeight);
      }
    }, []);

    return (
      <div
        className={styles.container}
        style={{ height: questionHeight }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={currentQuestion?.id}
            className={styles.question}
            ref={getGeight}

            drag={locked ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}

            transition={transition}
            variants={variants(swipeDirection)}

            initial="initial"
            animate="animate"
            exit="exit"

            onDragEnd={doSwipe}
            onAnimationStart={doLock}
            onAnimationComplete={doUnlock}
          >
            <div className={styles.number}>
              {currentQuestionNumber}
            </div>

            <hyphens.div className={styles.text}>
              {currentQuestion?.text}
            </hyphens.div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  },
);
