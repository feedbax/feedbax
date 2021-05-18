import { memo } from 'react';
import { useStore, selectors } from '@/lib/store';

import styles from './style.module.scss';
import clsx from 'clsx';

export default memo(
  function Pagination() {
    const currentQuestionId = useStore(selectors.currentQuestionId);
    const isSingleQuestion = useStore(selectors.isSingleQuestion);
    const questionIds = useStore(selectors.questionIds);

    if (isSingleQuestion) return null;

    return (
      <div className={styles.container}>
        {questionIds.map((questionId) => {
          const isCurrent = questionId === currentQuestionId;
          const classNames = clsx({
            [styles.dot]: true,
            [styles['dot-current']]: isCurrent,
          });

          return (
            <div
              key={questionId}
              className={classNames}
            />
          );
        })}
      </div>
    );
  },
);
