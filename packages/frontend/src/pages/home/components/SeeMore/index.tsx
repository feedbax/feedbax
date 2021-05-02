import { memo } from 'react';

import clsx from 'clsx';
import styles from './styles.module.scss';

type SeeMoreProps = {
  children: React.ReactNode;
  className?: string;
};

export default memo(
  function SeeMore({ children, className }: SeeMoreProps): JSX.Element {
    const classNames = clsx(className, styles.container);

    return (
      <div className={classNames}>
        <div className={styles.text}>{children}</div>
        <div className={styles.guide} />
      </div>
    );
  },
);
