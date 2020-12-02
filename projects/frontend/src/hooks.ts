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
  const rootRef = useRef(document.getElementById("___gatsby"));
  const [pointerEvent, setPointerEvent] = useState<PointerEvent>();

  useEffect(() => {
    const handlePointerDown = (eventA: PointerEvent) => {
      const { pageX: pageXA, pageY: pageYA } = eventA;

      const onPointerMove = (eventB: PointerEvent) => {
        const { pageX: pageXB, pageY: pageYB } = eventB;

        const deltaX = pageXB - pageXA;
        const deltaY = pageYB - pageYA;

        const deltaXSquared = deltaX * deltaX;
        const deltaYSquared = deltaY * deltaY;

        const distance = Math.sqrt(deltaXSquared + deltaYSquared);

        if (deltaXSquared > deltaYSquared && distance >= 20) {
          setPointerEvent(eventB);
          rootRef.current?.removeEventListener("pointermove", onPointerMove);
        }
      };

      const onPointerUp = () => {
        setPointerEvent(undefined);
        rootRef.current?.removeEventListener("pointermove", onPointerMove);
        rootRef.current?.removeEventListener("pointerup", onPointerUp);
      };

      rootRef.current?.addEventListener("pointermove", onPointerMove);
      rootRef.current?.addEventListener("pointerup", onPointerUp);
    };

    rootRef.current?.addEventListener("pointerdown", handlePointerDown);

    return () => {
      rootRef.current?.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return pointerEvent;
};

export const useTwemoji = () => {
  const ref = useCallback((element: HTMLElement | null) => {
    if (element) {
      twemoji.parse(element);
    }
  }, []);

  return ref;
};
