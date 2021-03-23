import { memo } from 'react';
import * as styles from './styles';

type TitleProps = { children: React.ReactNode };

export default memo(
  function Title({ children }: TitleProps): JSX.Element {
    return (
      <div css={styles.titleText}>
        {children}
      </div>
    );
  },
);
