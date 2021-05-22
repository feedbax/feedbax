/* eslint-disable no-param-reassign */

import consola from '@feedbax/api/generic/logger';

import type { Reaction } from '@feedbax/api/models/reaction';
import type { CreateStore, CreateSelectors, Selector } from '@/lib/store/types';
import type { WithImmer, ImmerAction } from '@/lib/store/types';

type ReactionsStoreData = {
  [reactionId: string]: Reaction & {
    questionId: string;
  };
};

type ReactionsStoreActions = {
  reset: ImmerAction<() => void>;

  addOne: ImmerAction<(reaction: Reaction) => void>;
  addMultiple: ImmerAction<(reactions: Reaction[]) => void>;

  removeOne: ImmerAction<(targetReaction: Reaction) => void>;
  removeOneById: ImmerAction<(targetReactionId: string) => void>;

  removeMultiple: ImmerAction<(targetReactions: Reaction[]) => void>;
  removeMultipleByIds: ImmerAction<(targetReactionIds: string[]) => void>;
};

type ReactionsStoreSelectors = {
  get: Selector<ReactionsStoreData>,
  removeMultiple: Selector<ReactionsStoreActions['removeMultiple']>,
};

type ModuleName = 'reactions';

type ReactionsStore =
  CreateStore<ModuleName, ReactionsStoreData, ReactionsStoreActions>;

type ReactionsSelectors =
  CreateSelectors<ModuleName, ReactionsStoreSelectors>;

declare module '@/lib/store/types' {
  interface FeedbaxStore extends ReactionsStore {}
}

const initial: ReactionsStoreData = {};

export const createReactionsStore = (
  (withImmer: WithImmer): ReactionsStore => ({
    reactions: {
      state: initial,
      actions: {
        reset: withImmer((draft) => {
          consola.trace('store.reactions.actions.reset');
          draft.reactions.state = initial;
        }),

        addOne: withImmer((draft, reaction) => {
          consola.trace('store.reactions.actions.addOne', { reaction });
          const question = draft.questions.state[reaction.questionId];

          if (typeof question !== 'undefined') {
            question.reactionIds ??= [];
            question.reactionIds.push(reaction.id);
          }

          draft.reactions.state[reaction.id] = reaction;
        }),

        addMultiple: withImmer((draft, reactions) => {
          consola.trace('store.reactions.actions.addMultiple', { reactions });

          for (let i = 0; i < reactions.length; i += 1) {
            const reaction = reactions[i];

            if (typeof reaction !== 'undefined') {
              draft.reactions.actions.addOne.withDraft(draft)(reaction);
            }
          }
        }),

        removeOne: withImmer((draft, targetReaction) => {
          consola.trace('store.reactions.actions.removeOne', { targetReaction });
          draft.reactions.actions.removeOneById.withDraft(draft)(targetReaction.id);
        }),

        removeOneById: withImmer((draft, targetReactionId) => {
          consola.trace('store.reactions.actions.removeOneById', { targetReactionId });
          const reaction = draft.reactions.state[targetReactionId];

          if (typeof reaction !== 'undefined') {
            const question = draft.questions.state[reaction.questionId];

            if (typeof question !== 'undefined') {
              const reactionIdIndex = question.reactionIds
                .findIndex((reactionId) => reactionId === targetReactionId);

              if (reactionIdIndex !== -1) {
                question.reactionIds.splice(reactionIdIndex, 1);
              }
            }

            delete draft.reactions.state[targetReactionId];
          }

          return draft;
        }),

        removeMultiple: withImmer((draft, targetReactions) => {
          consola.trace('store.reactions.actions.removeMultiple', { targetReactions });
          const targetReactionsIds = targetReactions.map((reaction) => reaction.id);
          draft.reactions.actions.removeMultipleByIds.withDraft(draft)(targetReactionsIds);
        }),

        removeMultipleByIds: withImmer((draft, targetReactionsIds) => {
          consola.trace('store.reactions.actions.removeMultipleByIds', { targetReactionsIds });

          for (let i = 0; i < targetReactionsIds.length; i += 1) {
            const targetReactionId = targetReactionsIds[i];
            draft.reactions.actions.removeOneById.withDraft(draft)(targetReactionId);
          }
        }),
      },
    },
  })
);

export const selectors: ReactionsSelectors = {
  reactions: {
    get: (store) => store.reactions.state,
    removeMultiple: (store) => store.reactions.actions.removeMultiple,
  },
};
