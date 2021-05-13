import Image from 'next/image';
import Logo from '@/components/Logo';

import { memo } from 'react';

import styles from './style.module.scss';

export default memo(
  function Loading() {
    return (
      <div className={styles.container}>
        <div className={styles['background-image']}>
          <Image
            priority
            quality={1}
            layout="fill"
            objectFit="cover"
            className={styles['background-image-landscape']}
            alt="feedbax loading event background image."
            src="/assets/images/backgrounds/landscape.png"
          />

          <Image
            priority
            quality={1}
            layout="fill"
            objectFit="cover"
            className={styles['background-image-portrait']}
            alt="feedbax loading event background image."
            src="/assets/images/backgrounds/portrait.png"
          />
        </div>

        <div className={styles['logo-pulse']}>
          <div className={styles.background} />
          <Logo href="#" variant="no-text" className={styles['logo-size']} />
        </div>

        <div className={styles['loading-text']}>
          Event wird geladen..
        </div>
      </div>
    );
  },
);
