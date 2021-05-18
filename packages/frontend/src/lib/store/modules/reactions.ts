/* eslint-disable no-param-reassign */

import consola from '@feedbax/api/generic/logger';

import type { Reaction } from '@feedbax/api/models/reaction';
import type { FeedbaxStore, WithImmer } from '@/lib/store/types';

interface ReactionsStoreData {
  reactions: {
    [reactionId: string]: Reaction & {
      questionId: string;
    };
  };
}

interface ReactionsStoreActions {
  resetReactions: (draft?: FeedbaxStore) => void;

  addReaction: (reaction: Reaction, draft?: FeedbaxStore) => void;
  addReactions: (reactions: Reaction[], draft?: FeedbaxStore) => void;

  removeReaction: (targetReaction: Reaction, draft?: FeedbaxStore) => void;
  removeReactionById: (targetReactionId: string, draft?: FeedbaxStore) => void;

  removeReactions: (targetReactions: Reaction[], draft?: FeedbaxStore) => void;
  removeReactionsByIds: (targetReactionIds: string[], draft?: FeedbaxStore) => void;
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

  resetReactions: (workingDraft) => {
    consola.trace('FeedbaxStore', 'resetReactions', { workingDraft });

    const implementation = (draft: FeedbaxStore) => {
      draft.reactions = initial.reactions;
    };

    return typeof workingDraft === 'undefined'
      ? withImmer(implementation)
      : implementation(workingDraft);
  },

  addReaction: (reaction, workingDraft) => {
    consola.trace('FeedbaxStore', 'addReaction', { reaction, workingDraft });

    const implementation = (draft: FeedbaxStore) => {
      const question = draft.questions[reaction.questionId];

      if (typeof question !== 'undefined') {
        question.reactionIds ??= [];
        question.reactionIds.push(reaction.id);
      }

      draft.reactions[reaction.id] = reaction;
    };

    return typeof workingDraft === 'undefined'
      ? withImmer(implementation)
      : implementation(workingDraft);
  },

  addReactions: (reactions, workingDraft) => {
    consola.trace('FeedbaxStore', 'addReactions', { reactions, workingDraft });

    const implementation = (draft: FeedbaxStore) => {
      for (let i = 0; i < reactions.length; i += 1) {
        const reaction = reactions[i];

        if (typeof reaction !== 'undefined') {
          draft.addReaction(reaction, draft);
        }
      }
    };

    return typeof workingDraft === 'undefined'
      ? withImmer(implementation)
      : implementation(workingDraft);
  },

  removeReaction: (targetReaction, workingDraft) => {
    consola.trace('FeedbaxStore', 'removeReaction', { targetReaction, workingDraft });

    const implementation = (draft: FeedbaxStore) => {
      draft.removeReactionById(targetReaction.id, draft);
    };

    return typeof workingDraft === 'undefined'
      ? withImmer(implementation)
      : implementation(workingDraft);
  },

  removeReactionById: (targetReactionId, workingDraft) => {
    consola.trace('FeedbaxStore', 'removeReactionById', { targetReactionId, workingDraft });

    const implementation = (draft: FeedbaxStore) => {
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
    };

    return typeof workingDraft === 'undefined'
      ? withImmer(implementation)
      : implementation(workingDraft);
  },

  removeReactions: (targetReactions, workingDraft) => {
    consola.trace('FeedbaxStore', 'removeReactions', { targetReactions, workingDraft });

    const implementation = (draft: FeedbaxStore) => {
      const targetReactionsIds = targetReactions.map((reaction) => reaction.id);
      draft.removeReactionsByIds(targetReactionsIds, draft);
    };

    return typeof workingDraft === 'undefined'
      ? withImmer(implementation)
      : implementation(workingDraft);
  },

  removeReactionsByIds: (targetReactionsIds, workingDraft) => {
    consola.trace('FeedbaxStore', 'removeReactionsByIds', { targetReactionsIds, workingDraft });

    const implementation = (draft: FeedbaxStore) => {
      for (let i = 0; i < targetReactionsIds.length; i += 1) {
        const targetReactionId = targetReactionsIds[i];
        draft.removeReactionById(targetReactionId, draft);
      }
    };

    return typeof workingDraft === 'undefined'
      ? withImmer(implementation)
      : implementation(workingDraft);
  },
});
