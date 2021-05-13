import LogoOriginal from '@/components/Logo';
import clsx from 'clsx';

import { memo } from 'react';

import styles from './style.module.scss';

export default memo(
  function Logo() {
    return (
      <div className={styles.container}>
        <LogoOriginal
          className={styles.logo}
          variant="no-shadow-and-text"
        />

        <div className={clsx(styles.text, styles['text-primary'])}>
          feedb.ax
        </div>

        <div className={clsx(styles.text, styles['text-secondary'])}>
          by 365steps
        </div>
      </div>
    );
  },
);
