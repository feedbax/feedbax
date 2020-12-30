import React, { useCallback, useEffect, useRef } from 'react';
import twemojis from 'twemoji';

type TwemojiProps = {
  renderWhenVisible?: boolean;
};

type TwemojiHTML = {
  [T in keyof JSX.IntrinsicElements]: (
    React.FC<Omit<JSX.IntrinsicElements[T], 'ref'> & TwemojiProps>
  )
};

const imageSourceGenerator = (icon: string) => `/twemoji/72x72/${icon}.png`;
const parserProps = { callback: imageSourceGenerator };

const twemojisParse = (
  (element: HTMLElement): void => {
    if (element.hasAttribute('twemoji-parsed')) return;

    twemojis.parse(element, parserProps);
    element.setAttribute('twemoji-parsed', '');
  }
);

const twemojiRenderer = (
  typeof window === 'undefined'
    ? undefined
    : new IntersectionObserver(
      (entries) => {
        for (let i = 0; i < entries.length; i += 1) {
          const entry = entries[i];

          if (entry.isIntersecting) {
            twemojisParse(entry.target as HTMLElement);
          }
        }
      },

      { threshold: 0 },
    )
);

const target = {} as TwemojiHTML;

const handler = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get (_: unknown, Element: any) {
    return (
      (props: TwemojiProps) => {
        const { renderWhenVisible = false, ...restProps } = props;
        const elementRef = useRef<HTMLElement>();

        const renderEmojis = useCallback(
          (el: HTMLElement | null) => {
            if (el !== null) {
              if (renderWhenVisible && twemojiRenderer) {
                elementRef.current = el;
                twemojiRenderer.observe(el);
              } else {
                twemojisParse(el);
              }
            }
          }, [renderWhenVisible],
        );

        useEffect(
          // on unmount
          () => () => {
            if (!elementRef.current) return;
            if (!renderWhenVisible) return;
            if (!twemojiRenderer) return;

            twemojiRenderer.unobserve(elementRef.current);
          }, [renderWhenVisible],
        );

        return (
          <Element
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...restProps}

            ref={renderEmojis}
          />
        );
      }
    );
  },
} as ProxyHandler<TwemojiHTML>;

const twemoji: TwemojiHTML = new Proxy(target, handler);
export default twemoji;
