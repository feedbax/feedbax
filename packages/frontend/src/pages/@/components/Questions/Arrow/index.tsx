import clsx from 'clsx';

import { memo } from 'react';
import { useStore, selectors } from '@/lib/store';

import styles from './style.module.scss';

type ArrowProps = {
  type: 'left' | 'right';
  onClick: () => void;
};

export default memo(
  function Arrow({ type, onClick }: ArrowProps) {
    const isFirstQuestion = useStore(selectors.navigation.isFirst);
    const isLastQuestion = useStore(selectors.navigation.isLast);

    const arrowContainerLeft = clsx({
      [styles['arrow-container']]: true,
      [styles['arrow-container-left']]: type === 'left',
      [styles['arrow-container-right']]: type === 'right',

      [styles['arrow-hidden']]: (
        (type === 'left' && isFirstQuestion)
        || (type === 'right' && isLastQuestion)
      ),
    });

    return (
      <div
        role="button"
        tabIndex={0}
        className={arrowContainerLeft}

        onClick={onClick}
        onKeyDown={onClick}
      >
        <div className={styles.arrow} />
      </div>
    );
  },
);
