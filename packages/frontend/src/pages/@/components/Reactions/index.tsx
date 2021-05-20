import { memo } from 'react';
import { useStore, selectors } from '@/lib/store';

import Reaction from './Reaction';
import styles from './style.module.scss';

export default memo(
  function Reactions() {
    const reactionIds = useStore(selectors.currentQuestionReactionIds);
    const settings = useStore(selectors.currentQuestionSettings);

    return (
      <div className={styles.reactions}>
        <div className={styles.background} />

        {reactionIds.map((reactionId, index) => (
          <Reaction
            key={reactionId}
            reactionId={reactionId}

            isFirst={index === 0}
            allowLikes={settings?.allowLikes ?? true}
            likesDisplayMode={settings?.likesDisplayMode ?? 'Numeric'}
          />
        ))}
      </div>
    );
  },
);
