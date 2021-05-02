import { memo } from 'react';
import styles from './styles.module.scss';

import BackgroundTop from './assets/background_top';
import BackgroundBottom from './assets/background_bottom';

export default memo(
  function Background(): JSX.Element {
    return (
      <div className={styles.container}>
        <div className={styles.images}>
          <div className={styles['image-top-container']}>
            <BackgroundTop className={styles['image-top']} />
          </div>

          <div className={styles['image-bottom-container']}>
            <BackgroundBottom className={styles['image-bottom']} />
          </div>
        </div>

        <div className={styles.background} />
      </div>
    );
  },
);
