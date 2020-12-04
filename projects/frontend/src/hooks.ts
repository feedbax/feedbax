import { useEffect, useLayoutEffect } from "react";
import { useState, useRef } from "react";
import { useCallback } from "react";

import twemoji, { ParseObject } from "twemoji";
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

let __observer: IntersectionObserver | undefined;
const parsedSet = new Set<Element>();

const imageSourceGenerator = (icon: string) => `/twemoji/72x72/${icon}.png`;
const props = { callback: imageSourceGenerator };
const twemojiParse = (el: HTMLElement) => twemoji.parse(el, props);

const useIntersectionObserver = () => {
  const [observer, setObserver] = useState(__observer);

  useEffect(() => {
    if (!observer) {
      __observer = new IntersectionObserver(
        function (entries) {
          for (let i = 0; i < entries.length; i++) {
            const entry = entries[i];

            if (entry.isIntersecting && !parsedSet.has(entry.target)) {
              parsedSet.add(entry.target);
              twemojiParse(entry.target as HTMLElement);
            }
          }
        },
        { threshold: [0] }
      );

      setObserver(__observer);
    }
  }, [setObserver]);

  return {
    ready: typeof observer !== "undefined",

    observe: (element: HTMLElement) => {
      observer?.observe(element);
    },

    unobserve: (element: HTMLElement) => {
      parsedSet.delete(element);
      observer?.unobserve(element);
    },
  };
};

export const useTwemoji = () => {
  const { ready, observe, unobserve } = useIntersectionObserver();
  const elementRef = useRef<HTMLElement>();

  const injectEmojis = useCallback(
    (element: HTMLElement | null) => {
      if (ready && element && !elementRef.current) {
        observe(element);
        elementRef.current = element;
      }
    },
    [ready, observe, elementRef.current]
  );

  useEffect(() => {
    return () => {
      if (ready && elementRef.current) {
        unobserve(elementRef.current);
      }
    };
  }, [ready, unobserve, elementRef.current]);

  return { injectEmojis };
};
