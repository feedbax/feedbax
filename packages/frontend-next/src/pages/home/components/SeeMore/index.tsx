import { memo } from 'react';
import * as styles from './styles';

type SeeMoreProps = { children: React.ReactNode };

export default memo(
  function SeeMore({ children }: SeeMoreProps): JSX.Element {
    return (
      <div className="see-more" css={styles.seeMoreContainer}>
        <div css={styles.seeMoreText}>{children}</div>
        <div css={styles.seeMoreGuide} />
      </div>
    );
  },
);
