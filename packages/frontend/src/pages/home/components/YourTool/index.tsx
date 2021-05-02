import { memo } from 'react';

import Image from 'next/image';
import hyphens from '@/components/Hyphens';

import styles from './styles.module.scss';

type YourToolProps = { children: React.ReactNode };

export default memo(
  function YourTool({ children }: YourToolProps): JSX.Element {
    return (
      <div className={styles.container}>
        <hyphens.div className={styles.text}>
          {children}
        </hyphens.div>

        <div className={styles.image}>
          <Image
            layout="fill"
            objectFit="contain"
            alt="A mockup of an example feedbax event."
            src="/assets/images/mockup.png"
          />
        </div>
      </div>
    );
  },
);
