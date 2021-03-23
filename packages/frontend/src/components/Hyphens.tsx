import { forwardRef } from 'react';

import type { Interpolation, Theme } from '@emotion/react';
import type React from 'react';

const target = {} as Hyphen;

const handler = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(_: unknown, Element: any) {
    if (Element === 'custom') {
      return (
        (Component: Component) => (
          forwardRef(
            ({ ccss, ...rest }: HyphensProps, ref) => {
              const customCss = ccss ?? {};
              const hyphensCss = { hyphens: 'manual !important' as 'manual' };

              return (
                <Component
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...rest}

                  ref={ref}
                  css={[hyphensCss, customCss]}
                />
              );
            },
          )
        )
      );
    }

    return (
      forwardRef(
        ({ ccss, ...rest }: HyphensProps, ref) => {
          const customStyles = ccss ?? {};
          const hyphensCss = { hyphens: 'manual !important' as 'manual' };

          return (
            <Element
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...rest}

              ref={ref}
              css={[hyphensCss, customStyles]}
            />
          );
        },
      )
    );
  },
} as ProxyHandler<Hyphen>;

const hyphens = new Proxy(target, handler);
export default hyphens;

type HyphensProps = { ccss?: Interpolation<Theme> };

type HyphenCustom = {
  custom: <T extends React.FC>(component: T) => (
    React.FC<React.ComponentProps<T> & HyphensProps>
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
  css?: Interpolation<Theme>;
}>;
