import { memo } from 'react';
import { useStore, selectors } from '@/lib/store';

import styles from './style.module.scss';

export default memo(
  function Reactions() {
    const answerIds = useStore(selectors.currentQuestionAnswerIds);
    const settings = useStore(selectors.currentQuestionSettings);

    return (
      <div className={styles.container}>
        {JSON.stringify(answerIds, null, 2)}
        {JSON.stringify(settings, null, 2)}
      </div>
    );
  },
);
