import { memo } from 'react';

import Image from 'next/image';
import hyphens from '@/components/Hyphens';

import * as styles from './styles';

type YourToolProps = { children: React.ReactNode };

export default memo(
  function YourTool({ children }: YourToolProps): JSX.Element {
    return (
      <div css={styles.container}>
        <hyphens.div ccss={styles.text}>
          {children}
        </hyphens.div>

        <div css={styles.image}>
          <Image
            layout="fill"
            objectFit="contain"
            src="/assets/images/mockup.png"
          />
        </div>
      </div>
    );
  },
);
