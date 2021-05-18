import { memo } from 'react';
import { useCallback, useState } from 'react';

import { useStore, selectors } from '@/lib/store';
import { AnimatePresence } from 'framer-motion';

import Question from './Question';
import Arrow from './Arrow';

import styles from './style.module.scss';

import type { PanInfo } from 'framer-motion';

type GetHeight = (el: HTMLDivElement | null) => void;
const useQuestionHeight = (): [number, GetHeight] => {
  const [questionHeight, setQuestionHeight] = useState(0);

  const getHeight = useCallback((el: HTMLDivElement | null) => {
    if (typeof el?.clientHeight === 'number') {
      setQuestionHeight(el?.clientHeight);
    }
  }, []);

  return [questionHeight, getHeight];
};

type DragEndEvent = MouseEvent | TouchEvent | PointerEvent;
type Direction = 'left' | 'right';

type DoSwipe = (direction: Direction | DragEndEvent, info?: PanInfo) => void;

const useQuestionSwipe = (): [number, DoSwipe] => {
  const nextQuestion = useStore(selectors.nextQuestion);
  const previousQuestion = useStore(selectors.previousQuestion);

  const [swipeDirection, setSwipeDirection] = useState(1);

  const doSwipe = useCallback(
    (direction: Direction | DragEndEvent, info?: PanInfo) => {
      const isLeft = (
        (typeof direction === 'string' && direction === 'left')
        || (typeof info !== 'undefined' && info.offset.x > 0)
      );

      const isRight = (
        (typeof direction === 'string' && direction === 'right')
        || (typeof info !== 'undefined' && info.offset.x < 0)
      );

      if (isLeft) {
        setSwipeDirection(-1);
        setTimeout(() => previousQuestion(), 0);
      } else if (isRight) {
        setSwipeDirection(1);
        setTimeout(() => nextQuestion(), 0);
      }
    },

    [],
  );

  return [swipeDirection, doSwipe];
};

export default memo(
  function Questions() {
    const currentQuestionId = useStore(selectors.currentQuestionId);

    const [questionHeight, getHeight] = useQuestionHeight();
    const [swipeDirection, doSwipe] = useQuestionSwipe();

    return (
      <div
        className={styles.container}
        style={{ height: questionHeight }}
      >
        <Arrow type="left" onClick={() => doSwipe('left')} />
        <Arrow type="right" onClick={() => doSwipe('right')} />

        <AnimatePresence initial={false}>
          <Question
            key={currentQuestionId}
            questionId={currentQuestionId}

            swipeDirection={swipeDirection}
            doSwipe={doSwipe}
            getHeight={getHeight}
          />
        </AnimatePresence>
      </div>
    );
  },
);
