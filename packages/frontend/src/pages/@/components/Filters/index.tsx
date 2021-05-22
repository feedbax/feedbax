import { memo } from 'react';
import { useStore, selectors } from '@/lib/store';

import ClockIcon from '@/components/Icon/icons/Clock';
import HeartIcon from '@/components/Icon/icons/Heart';
import UserIcon from '@/components/Icon/icons/User';

import styles from './style.module.scss';

import type { QuestionSettings } from '@feedbax/prisma';

export default memo(
  function Filters() {
    const reactionIds = useStore(selectors.currentQuestionReactionIds);
    const settings = useStore(selectors.currentQuestionSettings);

    return (
      <div className={styles.filters}>
        <div className={styles.filter}>
          <HeartIcon variant="outline" />
        </div>

        <div className={styles.filter}>
          <ClockIcon variant="filled" />
        </div>

        <div className={styles.filter}>
          <UserIcon variant="outline" />
        </div>
      </div>
    );
  },
);
