import { memo, useCallback } from 'react';
import { useStore, selectors } from '@/lib/store';
import { LikesDisplayMode } from '@feedbax/prisma';

import styles from './style.module.scss';

import type { FeedbaxStore } from '@/lib/store/types';
import clsx from 'clsx';

type ReactionProps = {
  isFirst: boolean;

  reactionId: string;
  likesDisplayMode: LikesDisplayMode;
  allowLikes: boolean;
};

const useReaction = (reactionId?: string) => {
  const reactionSelector = useCallback(
    (state: FeedbaxStore) => {
      if (typeof reactionId === 'string') {
        return state.reactions[reactionId];
      }

      return undefined;
    },

    [reactionId],
  );

  const reaction = useStore(reactionSelector);
  return reaction;
};

export default memo(
  function Reaction(props: ReactionProps) {
    const { reactionId } = props;
    const { likesDisplayMode } = props;
    const { allowLikes } = props;
    const { isFirst } = props;

    const reaction = useReaction(reactionId);
    const baseClassNames = clsx(
      styles.reaction,
      isFirst && styles.first,
    );

    switch (likesDisplayMode) {
      case 'Numeric': {
        const classNames = clsx(
          baseClassNames,
          styles.numeric,
        );

        return (
          <div className={classNames}>
            {reaction?.text}
          </div>
        );
      }

      case 'Percentage': {
        const classNames = clsx(
          baseClassNames,
          styles.percentage,
        );

        return (
          <div className={classNames}>
            {reaction?.text}
          </div>
        );
      }

      default: {
        return null;
      }
    }
  },
);
