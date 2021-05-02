import { memo } from 'react';
import styles from './styles.module.scss';

type TitleProps = { children: React.ReactNode };

export default memo(
  function Title({ children }: TitleProps): JSX.Element {
    return (
      <div className={styles.text}>
        {children}
      </div>
    );
  },
);
