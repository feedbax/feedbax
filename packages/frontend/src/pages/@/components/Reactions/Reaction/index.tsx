import { memo } from 'react';
import { useStore, selectors } from '@/lib/store';
import { LikesDisplayMode } from '@feedbax/prisma';

import styles from './style.module.scss';

type ReactionProps = {
  reactionId: string;
  likesDisplayMode: LikesDisplayMode;
  allowLikes: boolean;
};

export default memo(
  function Reaction() {
    const reactionIds = useStore(selectors.currentQuestionReactionIds);
    const settings = useStore(selectors.currentQuestionSettings);

    return (
      <div className={styles.container}>
        {JSON.stringify(reactionIds, null, 2)}
        {JSON.stringify(settings, null, 2)}
      </div>
    );
  },
);
