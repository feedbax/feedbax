/** @jsx jsx */

import React from 'react';
import { jsx, css, PropsOf } from '@emotion/react';

import type { SerializedStyles } from '@emotion/react';

type HyphensProps = { style?: SerializedStyles };

type HyphenCustom = {
  custom: <T extends React.FC>(component: T) => (
    React.FC<PropsOf<T> & HyphensProps>
  )
};

type HyphenHTML = {
  [T in keyof JSX.IntrinsicElements]: (
    React.FC<JSX.IntrinsicElements[T] & HyphensProps>
  )
};

type Hyphen = HyphenCustom & HyphenHTML;

type Component = React.FC<{
  ref: React.ForwardedRef<unknown>;
  css: SerializedStyles;
}>;

const target = {} as Hyphen;

const handler = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get (_: unknown, Element: any) {
    if (Element === 'custom') {
      return (
        (Component: Component) => (
          React.forwardRef(
            ({ style, ...rest }: HyphensProps, ref) => (
              <Component
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...rest}

                ref={ref}
                css={css([css`hyphens: manual !important;`, style])}
              />
            ),
          )
        )
      );
    }

    return (
      React.forwardRef(
        ({ style, ...rest }: HyphensProps, ref) => (
          <Element
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}

            ref={ref}
            css={css([css`hyphens: manual !important;`, style])}
          />
        ),
      )
    );
  },
} as ProxyHandler<Hyphen>;

const hyphens = new Proxy(target, handler);
export default hyphens;
