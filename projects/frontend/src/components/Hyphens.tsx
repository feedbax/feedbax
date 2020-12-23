/** @jsx jsx */

import React from 'react';
import { jsx, css, PropsOf } from '@emotion/react';

type HyphenCustom = { custom: <T>(component: T) => React.FC<PropsOf<T>> };
type HyphenHTML = { [key in keyof React.ReactHTML]: React.ReactHTML[key] };
type Hyphen = HyphenCustom & HyphenHTML;

const target = {} as Hyphen;

// eslint-disable-next-line import/prefer-default-export
const hyphens = new Proxy(target, {
  get (_, Element: keyof Hyphen) {
    if (Element === 'custom') {
      return (
        (Component: React.FC) => (
          React.forwardRef(
            (props: React.HTMLProps<unknown>, ref) => (
              <Component
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}

                ref={ref}
                css={css`hyphens: manual !important;`}
              />
            ),
          )
        )
      );
    }

    return (
      React.forwardRef(
        (props: React.HTMLProps<unknown>, ref) => (
          <Element
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}

            ref={ref}
            css={css`hyphens: manual !important;`}
          />
        ),
      )
    );
  },
});

export default hyphens;
