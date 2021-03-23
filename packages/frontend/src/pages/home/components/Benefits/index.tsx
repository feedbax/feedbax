import { memo } from 'react';
import * as styles from './styles';

type BenefitsProps = { children: React.ReactNode };

export default memo(
  function Benefits({ children }: BenefitsProps): JSX.Element {
    return (
      <div css={styles.benefitsContainer}>
        {children}
      </div>
    );
  },
);

export { default as Benefit } from './components/Benefit';
