import { useEffect, useLayoutEffect } from "react";
import { useState, useRef } from "react";
import { useCallback } from "react";

import twemoji from "twemoji";
import ResizeObserver from "resize-observer-polyfill";

export const useSize = (type: "w" | "h" | "wh" = "wh") => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [element, setElement] = useState<Element | null>(null);

  const ref = useCallback((node: Element | null) => setElement(node), []);

  useLayoutEffect(() => {
    const observer = new ResizeObserver(([sizes]) => {
      const { width, height } = sizes.contentRect;

      const xChanged = dimensions.width !== width;
      const yChanged = dimensions.height !== height;
      const bothChanged = xChanged && yChanged;

      if (type === "w" && xChanged) {
        setDimensions({ width, height: 0 });
      }

      if (type === "h" && yChanged) {
        setDimensions({ height, width: 0 });
      }

      if (type === "wh" && bothChanged) {
        setDimensions({ width, height });
      }
    });

    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, [element]);

  return [ref, dimensions] as const;
};

export const useHorizontalSwipe = () => {
  const [pointerEvent, setPointerEvent] = useState<TouchEvent>();

  useEffect(() => {
    const onTouchStart = (eventA: TouchEvent) => {
      if (eventA.touches.length > 1) return;

      const firstTouchA = eventA.touches[0];
      const { pageX: pageXA, pageY: pageYA } = firstTouchA;

      const onTouchMove = (eventB: TouchEvent) => {
        const firstTouchB = eventB.touches[0];
        const { pageX: pageXB, pageY: pageYB } = firstTouchB;

        const deltaX = pageXB - pageXA;
        const deltaY = pageYB - pageYA;

        const deltaXSquared = deltaX * deltaX;
        const deltaYSquared = deltaY * deltaY;

        const distance = Math.sqrt(deltaXSquared + deltaYSquared);

        if (deltaXSquared > deltaYSquared && distance >= 20) {
          setPointerEvent(eventB);
          window.removeEventListener("touchmove", onTouchMove);
        }
      };

      const onTouchEnd = () => {
        setPointerEvent(undefined);
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("touchend", onTouchEnd);
      };

      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("touchend", onTouchEnd);
    };

    window.addEventListener("touchstart", onTouchStart);

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
    };
  }, []);

  return pointerEvent;
};

export const useTwemoji = () => {
  const injectEmojis = useCallback((element: HTMLElement | null) => {
    if (element) {
      twemoji.parse(element);
    }
  }, []);

  return { injectEmojis };
};
