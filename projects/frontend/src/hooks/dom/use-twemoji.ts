import { useEffect, useRef, useCallback } from 'react';
import twemoji from 'twemoji';

const parsedSet = new Set<Element>();

const imageSourceGenerator = (icon: string) => `/twemoji/72x72/${icon}.png`;
const props = { callback: imageSourceGenerator };
const twemojiParse = (el: HTMLElement) => twemoji.parse(el, props);

const twemojiRenderer = typeof window === 'undefined'
  ? undefined
  : new IntersectionObserver(
    (entries) => {
      for (let i = 0; i < entries.length; i += 1) {
        const entry = entries[i];

        if (entry.isIntersecting && !parsedSet.has(entry.target)) {
          parsedSet.add(entry.target);
          twemojiParse(entry.target as HTMLElement);
        }
      }
    },
    { threshold: [0] },
  );

type InjectEmojis = { injectEmojis: (element: HTMLElement | null) => void };

const useTwemoji = (): InjectEmojis => {
  const elementRef = useRef<HTMLElement>();

  const injectEmojis = useCallback((element: HTMLElement | null) => {
    if (element && twemojiRenderer) {
      elementRef.current = element;
      twemojiRenderer.observe(element);
    }
  }, []);

  useEffect(() => () => {
    if (elementRef.current && twemojiRenderer) {
      twemojiRenderer.unobserve(elementRef.current);
    }
  }, []);

  return { injectEmojis };
};

export default useTwemoji;
