/** @jsx jsx */

import React from 'react';
import { jsx, css, PropsOf } from '@emotion/react';

import type { SerializedStyles } from '@emotion/react';

type GetHTMLProps<T extends keyof React.ReactHTML> = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.ReactHTML[T] extends React.DetailedHTMLFactory<infer R, any>
    ? R
    : never
);

type HyphensProps = { style?: SerializedStyles };

type GetHyphensProps<T extends keyof React.ReactHTML> = (
  GetHTMLProps<T> & HyphensProps
);

type HyphenCustom = { custom: <T>(component: T) => React.FC<PropsOf<T> & HyphensProps> };
type HyphenHTML = { [key in keyof React.ReactHTML]: React.FC<GetHyphensProps<key>> };
type Hyphen = HyphenCustom & HyphenHTML;

type Component = React.FC<{
  ref: React.ForwardedRef<unknown>;
  css: SerializedStyles;
}>;

const target = {} as Hyphen;

// eslint-disable-next-line import/prefer-default-export
const hyphens = new Proxy(target, {
  get <T extends keyof Hyphen>(_: unknown, Element: T) {
    if (Element === 'custom') {
      return (
        (Component: Component) => (
          React.forwardRef(
            ({ style, ...rest }: GetHyphensProps<T>, ref) => (
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

    const _Element: keyof HyphenHTML = Element;

    return (
      React.forwardRef(
        ({ style, ...rest }: GetHyphensProps<T>, ref) => (
          <_Element
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}

            ref={ref}
            css={css([css`hyphens: manual !important;`, style])}
          />
        ),
      )
    );
  },
});

export default hyphens;
