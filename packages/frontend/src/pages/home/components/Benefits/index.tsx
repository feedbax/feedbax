import { memo } from 'react';
import styles from './styles.module.scss';

type BenefitsProps = { children: React.ReactNode };

export default memo(
  function Benefits({ children }: BenefitsProps): JSX.Element {
    return (
      <div className={styles.container}>
        {children}
      </div>
    );
  },
);

export { default as Benefit } from './components/Benefit';
