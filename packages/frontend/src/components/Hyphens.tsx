import React from 'react';
import { useFela } from 'react-fela';

import type { ComponentProps } from 'react';
import type { FelaRule } from '~lib/css-helper/fela';

type HyphensProps = { style?: FelaRule };

type HyphenCustom = {
  custom: <T extends React.FC>(component: T) => (
    React.FC<ComponentProps<T> & HyphensProps>
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
  className: string;
}>;

const target = {} as Hyphen;

const handler = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get (_: unknown, Element: any) {
    if (Element === 'custom') {
      return (
        (Component: Component) => (
          React.forwardRef(
            ({ style, ...rest }: HyphensProps, ref) => {
              const { css } = useFela();

              const userRule = style ?? {};
              const hyphensRule = { hyphens: 'manual !important' as 'manual' };

              return (
                <Component
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...rest}

                  ref={ref}
                  className={css(hyphensRule, userRule)}
                />
              );
            },
          )
        )
      );
    }

    return (
      React.forwardRef(
        ({ style, ...rest }: HyphensProps, ref) => {
          const { css } = useFela();

          const userRule = style ?? {};
          const hyphensRule = { hyphens: 'manual !important' as 'manual' };

          return (
            <Element
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...rest}

              ref={ref}
              className={css(hyphensRule, userRule)}
            />
          );
        },
      )
    );
  },
} as ProxyHandler<Hyphen>;

const hyphens = new Proxy(target, handler);
export default hyphens;
