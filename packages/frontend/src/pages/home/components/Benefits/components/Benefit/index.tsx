import { memo } from 'react';

import Image from 'next/image';
import hyphens from '@/components/Hyphens';

import styles from './styles.module.scss';

type BenefitProps = {
  children: React.ReactNode;

  src: string;
  width: number;
  height: number;
};

export default memo(
  function Benefit(props: BenefitProps): JSX.Element {
    const { children } = props;
    const { src, width, height } = props;

    return (
      <div className={styles.container}>
        <div className={styles.image}>
          <Image
            layout="responsive"
            objectFit="contain"
            objectPosition="bottom"

            src={src}
            width={width}
            height={height}
          />
        </div>

        <hyphens.div className={styles.text}>
          {children}
        </hyphens.div>
      </div>
    );
  },
);
