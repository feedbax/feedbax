/* eslint-disable no-param-reassign */

import consola from '@feedbax/api/generic/logger';

import type { Reaction } from '@feedbax/api/models/reaction';
import type { WithImmer, ImmerAction } from '@/lib/store/types';

interface ReactionsStoreData {
  reactions: {
    [reactionId: string]: Reaction & {
      questionId: string;
    };
  };
}

interface ReactionsStoreActions {
  resetReactions: ImmerAction<() => void>;

  addReaction: ImmerAction<(reaction: Reaction) => void>;
  addReactions: ImmerAction<(reactions: Reaction[]) => void>;

  removeReaction: ImmerAction<(targetReaction: Reaction) => void>;
  removeReactionById: ImmerAction<(targetReactionId: string) => void>;

  removeReactions: ImmerAction<(targetReactions: Reaction[]) => void>;
  removeReactionsByIds: ImmerAction<(targetReactionIds: string[]) => void>;
}

declare module '@/lib/store/types' {
  interface FeedbaxStoreData extends ReactionsStoreData {}
  interface FeedbaxStoreActions extends ReactionsStoreActions {}
}

type ReactionsStore = ReactionsStoreData & ReactionsStoreActions;

const initial: ReactionsStoreData = {
  reactions: {},
};

export const createReactionsStore = (withImmer: WithImmer): ReactionsStore => ({
  reactions: initial.reactions,

  resetReactions: withImmer((draft) => {
    consola.trace('FeedbaxStore', 'resetReactions');
    draft.reactions = initial.reactions;
  }),

  addReaction: withImmer((draft, reaction) => {
    consola.trace('FeedbaxStore', 'addReaction', { reaction });
    const question = draft.questions[reaction.questionId];

    if (typeof question !== 'undefined') {
      question.reactionIds ??= [];
      question.reactionIds.push(reaction.id);
    }

    draft.reactions[reaction.id] = reaction;
  }),

  addReactions: withImmer((draft, reactions) => {
    consola.trace('FeedbaxStore', 'addReactions', { reactions });

    for (let i = 0; i < reactions.length; i += 1) {
      const reaction = reactions[i];

      if (typeof reaction !== 'undefined') {
        draft.addReaction.withDraft(draft)(reaction);
      }
    }
  }),

  removeReaction: withImmer((draft, targetReaction) => {
    consola.trace('FeedbaxStore', 'removeReaction', { targetReaction });
    draft.removeReactionById.withDraft(draft)(targetReaction.id);
  }),

  removeReactionById: withImmer((draft, targetReactionId) => {
    consola.trace('FeedbaxStore', 'removeReactionById', { targetReactionId });
    const reaction = draft.reactions[targetReactionId];

    if (typeof reaction !== 'undefined') {
      const question = draft.questions[reaction.questionId];

      if (typeof question !== 'undefined') {
        const reactionIdIndex = question.reactionIds
          .findIndex((reactionId) => reactionId === targetReactionId);

        if (reactionIdIndex !== -1) {
          question.reactionIds.splice(reactionIdIndex, 1);
        }
      }

      delete draft.reactions[targetReactionId];
    }

    return draft;
  }),

  removeReactions: withImmer((draft, targetReactions) => {
    consola.trace('FeedbaxStore', 'removeReactions', { targetReactions });
    const targetReactionsIds = targetReactions.map((reaction) => reaction.id);
    draft.removeReactionsByIds.withDraft(draft)(targetReactionsIds);
  }),

  removeReactionsByIds: withImmer((draft, targetReactionsIds) => {
    consola.trace('FeedbaxStore', 'removeReactionsByIds', { targetReactionsIds });

    for (let i = 0; i < targetReactionsIds.length; i += 1) {
      const targetReactionId = targetReactionsIds[i];
      draft.removeReactionById.withDraft(draft)(targetReactionId);
    }
  }),
});
