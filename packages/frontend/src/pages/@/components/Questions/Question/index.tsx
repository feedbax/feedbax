import { memo } from 'react';
import { useCallback, useState } from 'react';

import { useStore, selectors } from '@/lib/store';
import { motion } from 'framer-motion';

import hyphens from '@/components/Hyphens';
import styles from './style.module.scss';

import type { FeedbaxStore } from '@/lib/store/types';
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

const useQuestion = (currentQuestionId?: string) => {
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

type DragEndEvent = MouseEvent | TouchEvent | PointerEvent;
type QuestionProps = {
  questionId?: string;
  swipeDirection: number;

  getHeight: (el: HTMLDivElement | null) => void;
  doSwipe: (_: DragEndEvent, info: PanInfo) => void;
};

export default memo(
  function Question(props: QuestionProps) {
    const { questionId, swipeDirection } = props;
    const { getHeight, doSwipe } = props;

    const currentQuestionNumber = useStore(selectors.currentQuestionNumber);
    const currentQuestion = useQuestion(questionId);

    const { locked, doLock, doUnlock } = useDragLock();

    return (
      <motion.div
        className={styles.question}
        ref={getHeight}

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

        <hyphens.div>
          {currentQuestion?.text}
        </hyphens.div>
      </motion.div>
    );
  },
);
