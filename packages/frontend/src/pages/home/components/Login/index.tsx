import { memo } from 'react';

import clsx from 'clsx';
import styles from './styles.module.scss';

type LoginProps = {
  children: React.ReactNode;
  className?: string;
};

export default memo(
  function Login({ children, className }: LoginProps): JSX.Element {
    const classNames = clsx(className, styles.form);

    return (
      <div className={classNames}>
        {children}
      </div>
    );
  },
);

export { default as Button } from './components/Button';
export { default as Input } from './components/Input';
