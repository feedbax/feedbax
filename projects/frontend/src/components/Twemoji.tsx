import React, { useCallback, useEffect, useRef } from 'react';
import twemojis from 'twemoji';

type GetHTMLProps<T extends keyof React.ReactHTML> = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.ReactHTML[T] extends React.DetailedHTMLFactory<infer R, any>
    ? R
    : never
);

type TwemojiProps = {
  renderWhenVisible?: boolean;
};

type GetTwemojiProps<T extends keyof React.ReactHTML> = (
  GetHTMLProps<T> & TwemojiProps
);

type TwemojiHTML = {
  [key in keyof React.ReactHTML]: React.FC<GetTwemojiProps<key>>
};

const target = {} as TwemojiHTML;

const imageSourceGenerator = (icon: string) => `/twemoji/72x72/${icon}.png`;
const parserProps = { callback: imageSourceGenerator };

const twemojisParse = (
  (element: Element): void => {
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

// eslint-disable-next-line import/prefer-default-export
const twemoji = new Proxy(target, {
  get <T extends keyof TwemojiHTML>(_: unknown, Element: T) {
    return (
      (props: GetTwemojiProps<T>) => {
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
});

export default twemoji;
