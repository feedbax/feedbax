/** @jsx jsx */
/** @jsxFrag React.Fragment */

import React, { useState, useEffect } from "react";

import { jsx, css } from "@emotion/react";

import { motion, useAnimation, PanInfo, useDragControls } from "framer-motion";
import { useSize, useHorizontalSwipe } from "~hooks";

import { useSelector } from "react-redux";

import { store } from "~store";
import { actions, selectors } from "~store/modules/questions";

type DragEvent = MouseEvent | TouchEvent | PointerEvent;
type OnDragEnd = (event: DragEvent, info: PanInfo) => Promise<void>;

type Props = { children: React.ReactNode };

const Slider = React.memo(({ children }: Props) => {
  const currentIndex = useSelector(selectors.currentIndex);
  const questionsLength = useSelector(selectors.questionsLength);

  const pointerEvent = useHorizontalSwipe();
  const [ref, { width }] = useSize("w");

  const [lockAnimation, setLockAnimation] = useState(false);
  const [lockDrag, setLockDrag] = useState(true);

  const controls = useAnimation();
  const dragControls = useDragControls();

  const onDragEnd: OnDragEnd = async (_, info) => {
    if (lockAnimation) return;
    setLockAnimation(true);
    setLockDrag(true);

    if (info.offset.x >= 1 && currentIndex >= 1) {
      await controls.start("right");
      store.dispatch(actions.setCurrentIndex(-1));
    }

    if (info.offset.x <= -1 && currentIndex < questionsLength - 1) {
      await controls.start("left");
      store.dispatch(actions.setCurrentIndex(1));
    }

    controls.set("none");
    setLockAnimation(false);
  };

  useEffect(() => {
    if (pointerEvent && !lockAnimation) {
      setLockDrag(false);
      dragControls.start(pointerEvent);
    }
  }, [pointerEvent, lockAnimation, setLockDrag]);

  return (
    <div css={stylesWrapper}>
      <motion.div
        ref={ref}
        css={stylesSlider}
        dragControls={dragControls}
        drag={lockDrag ? false : "x"}
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
