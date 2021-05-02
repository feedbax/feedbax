import { forwardRef } from 'react';

import clsx from 'clsx';
import styles from './styles.module.scss';

import type React from 'react';

const target = {} as Hyphen;
const handler = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(_: unknown, Element: any) {
    if (Element === 'custom') {
      return (
        (Component: HyphenComponent) => (
          forwardRef(
            (props: HyphensProps, ref) => {
              const { className } = props;
              const classNames = clsx(className, styles['allow-hyphens']);

              return (
                <Component
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...props}

                  className={classNames}
                  ref={ref}
                />
              );
            },
          )
        )
      );
    }

    return (
      forwardRef(
        (props: HyphensProps, ref) => {
          const { className } = props;
          const classNames = clsx(className, styles['allow-hyphens']);

          return (
            <Element
                // eslint-disable-next-line react/jsx-props-no-spreading
              {...props}

              className={classNames}
              ref={ref}
            />
          );
        },
      )
    );
  },
} as ProxyHandler<Hyphen>;

const hyphens = new Proxy(target, handler);
export default hyphens;

type HyphensProps = { className?: string };
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

type HyphenComponent = React.FC<{
  className: string;
  ref: React.ForwardedRef<unknown>;
}>;
