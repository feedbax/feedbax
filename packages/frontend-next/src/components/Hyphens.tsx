import { forwardRef } from 'react';
import { useFela } from 'react-fela';

import type React from 'react';
import type { IStyle } from 'fela';

const target = {} as Hyphen;

const handler = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get (_: unknown, Element: any) {
    if (Element === 'custom') {
      return (
        (Component: Component) => (
          forwardRef(
            ({ customRule, ...rest }: HyphensProps, ref) => {
              const { css } = useFela();

              const userRule = customRule ?? {};
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
      forwardRef(
        ({ customRule, ...rest }: HyphensProps, ref) => {
          const { css } = useFela();

          const userRule = customRule ?? {};
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

type HyphensProps = { customRule?: IStyle };

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
  className: string;
}>;
