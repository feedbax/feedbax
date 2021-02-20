import { memo } from 'react';

import Image from 'next/image';
import hyphens from '@/components/Hyphens';

import * as styles from './styles';

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
      <div css={styles.benefitContainer}>
        <div css={styles.benefitImage}>
          <Image
            layout="responsive"
            objectFit="contain"
            objectPosition="bottom"

            src={src}
            width={width}
            height={height}
          />
        </div>

        <hyphens.div ccss={styles.benefitText}>
          {children}
        </hyphens.div>
      </div>
    );
  },
);
