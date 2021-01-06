import React, { useCallback } from 'react';
import twemojis from 'twemoji';

type TwemojiHTML = {
  [T in keyof JSX.IntrinsicElements]: (
    React.FC<Omit<JSX.IntrinsicElements[T], 'ref'>>
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

const target = {} as TwemojiHTML;

const handler = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get (_: unknown, Element: any) {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (props: any) => {
        const renderEmojis = useCallback(
          (el: HTMLElement | null) => {
            if (el !== null) {
              twemojisParse(el);
            }
          }, [],
        );

        return (
          <Element
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}

            ref={renderEmojis}
          />
        );
      }
    );
  },
} as ProxyHandler<TwemojiHTML>;

const twemoji: TwemojiHTML = new Proxy(target, handler);
export default twemoji;
