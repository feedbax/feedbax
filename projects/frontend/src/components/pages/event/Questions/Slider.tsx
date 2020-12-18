/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React, { useState, useEffect } from 'react';
import { jsx, css } from '@emotion/react';

import { motion, useAnimation, useDragControls } from 'framer-motion';

import useSize from '~hooks/other/dom/use-size';
import useHorizontalSwipe from '~hooks/other/dom/use-horizontal-swipe';

import { useSelector } from 'react-redux';

import { store } from '~store';
import { actions, selectors } from '~store/modules/questions';

import type { PanInfo } from 'framer-motion';

type DragEvent = MouseEvent | TouchEvent | PointerEvent;
type OnDragEnd = (event: DragEvent, info: PanInfo) => Promise<void>;

type Props = { children: React.ReactNode };

const Slider = React.memo(({ children }: Props) => {
  const currentIndex = useSelector(selectors.currentIndex);
  const questionsLength = useSelector(selectors.questionsLength);

  const pointerEvent = useHorizontalSwipe();
  const [ref, { width }] = useSize('w');

  const [lockAnimation, setLockAnimation] = useState(false);
  const [lockDrag, setLockDrag] = useState(true);

  const controls = useAnimation();
  const dragControls = useDragControls();

  const onDragEnd: OnDragEnd = async (_, info) => {
    if (lockAnimation) return;
    setLockAnimation(true);
    setLockDrag(true);

    const isSwipeLeft = info.offset.x >= 1 && currentIndex >= 1;
    const isSwipeRight = info.offset.x <= -1 && currentIndex < questionsLength - 1;

    if (isSwipeLeft) {
      await controls.start('right');
      store.dispatch(actions.addToCurrentIndex(-1));
    }

    if (isSwipeRight) {
      await controls.start('left');
      store.dispatch(actions.addToCurrentIndex(1));
    }

    if (!isSwipeLeft && !isSwipeRight) {
      await controls.start('none');
    }

    controls.set('none');
    setLockAnimation(false);
  };

  useEffect(() => {
    if (pointerEvent && !lockAnimation) {
      setLockDrag(false);
      dragControls.start(pointerEvent);
    }
  }, [pointerEvent, lockAnimation, setLockDrag, dragControls]);

  return (
    <div css={stylesWrapper}>
      <motion.div
        ref={ref}
        css={stylesSlider}
        dragControls={dragControls}
        drag={lockDrag ? false : 'x'}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={onDragEnd}
        animate={controls}
        initial="none"
        transition={{
          bounce: 0,
        }}
        variants={{
          left: { x: -width },
          right: { x: width },
          none: { x: 0 },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
});

export default Slider;

const stylesWrapper = css`
  position: relative;
  overflow: hidden;

  margin: 25px 0;
`;

const stylesSlider = css`
  position: relative;
`;
