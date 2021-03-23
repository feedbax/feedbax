import { memo } from 'react';
import * as styles from './styles';

import BackgroundTop from './assets/background_top';
import BackgroundBottom from './assets/background_bottom';

export default memo(
  function Background(): JSX.Element {
    return (
      <div css={styles.backgroundContainer}>
        <div css={styles.imagesContainer}>
          <div css={styles.topContainer}>
            <BackgroundTop ccss={styles.topImage} />
          </div>

          <div css={styles.bottomContainer}>
            <BackgroundBottom ccss={styles.bottomImage} />
          </div>
        </div>

        <div css={styles.coloredBackground} />
      </div>
    );
  },
);
