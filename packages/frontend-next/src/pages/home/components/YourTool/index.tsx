import { memo } from 'react';

import Image from 'next/image';
import hyphens from '@/components/Hyphens';

import * as styles from './styles';

type TitleProps = { children: React.ReactNode };

export default memo(
  function Title({ children }: TitleProps): JSX.Element {
    return (
      <div css={styles.container}>
        <hyphens.div ccss={styles.text}>
          {children}
        </hyphens.div>

        <div css={styles.image}>
          <Image
            layout="fill"
            objectFit="contain"
            src="/assets/images/feedbax_mockup.png"
          />
        </div>
      </div>
    );
  },
);
