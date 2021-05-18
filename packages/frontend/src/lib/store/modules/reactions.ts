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

  addReaction: (answer: Reaction, draft?: FeedbaxStore) => void;
  addReactions: (answers: Reaction[], draft?: FeedbaxStore) => void;

  removeReaction: (targetAnswer: Reaction, draft?: FeedbaxStore) => void;
  removeReactionById: (targetAnswerId: string, draft?: FeedbaxStore) => void;

  removeReactions: (targetAnswers: Reaction[], draft?: FeedbaxStore) => void;
  removeReactionsByIds: (targetAnswerIds: string[], draft?: FeedbaxStore) => void;
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

  addReaction: (answer, workingDraft) => {
    consola.trace('FeedbaxStore', 'addReaction', { answer, workingDraft });

    const implementation = (draft: FeedbaxStore) => {
      const question = draft.questions[answer.questionId];

      if (typeof question !== 'undefined') {
        question.answerIds ??= [];
        question.answerIds.push(answer.id);
      }

      draft.reactions[answer.id] = answer;
    };

    return typeof workingDraft === 'undefined'
      ? withImmer(implementation)
      : implementation(workingDraft);
  },

  addReactions: (answers, workingDraft) => {
    consola.trace('FeedbaxStore', 'addReactions', { answers, workingDraft });

    const implementation = (draft: FeedbaxStore) => {
      for (let i = 0; i < answers.length; i += 1) {
        const answer = answers[i];

        if (typeof answer !== 'undefined') {
          draft.addReaction(answer, draft);
        }
      }
    };

    return typeof workingDraft === 'undefined'
      ? withImmer(implementation)
      : implementation(workingDraft);
  },

  removeReaction: (targetAnswer, workingDraft) => {
    consola.trace('FeedbaxStore', 'removeReaction', { targetAnswer, workingDraft });

    const implementation = (draft: FeedbaxStore) => {
      draft.removeReactionById(targetAnswer.id, draft);
    };

    return typeof workingDraft === 'undefined'
      ? withImmer(implementation)
      : implementation(workingDraft);
  },

  removeReactionById: (targetAnswerId, workingDraft) => {
    consola.trace('FeedbaxStore', 'removeReactionById', { targetAnswerId, workingDraft });

    const implementation = (draft: FeedbaxStore) => {
      const answer = draft.reactions[targetAnswerId];

      if (typeof answer !== 'undefined') {
        const question = draft.questions[answer.questionId];

        if (typeof question !== 'undefined') {
          const answerIdIndex = question.answerIds
            .findIndex((answerId) => answerId === targetAnswerId);

          if (answerIdIndex !== -1) {
            question.answerIds.splice(answerIdIndex, 1);
          }
        }

        delete draft.reactions[targetAnswerId];
      }

      return draft;
    };

    return typeof workingDraft === 'undefined'
      ? withImmer(implementation)
      : implementation(workingDraft);
  },

  removeReactions: (targetAnswers, workingDraft) => {
    consola.trace('FeedbaxStore', 'removeReactions', { targetAnswers, workingDraft });

    const implementation = (draft: FeedbaxStore) => {
      const targetAnswersIds = targetAnswers.map((answer) => answer.id);
      draft.removeReactionsByIds(targetAnswersIds, draft);
    };

    return typeof workingDraft === 'undefined'
      ? withImmer(implementation)
      : implementation(workingDraft);
  },

  removeReactionsByIds: (targetAnswersIds, workingDraft) => {
    consola.trace('FeedbaxStore', 'removeReactionsByIds', { targetAnswersIds, workingDraft });

    const implementation = (draft: FeedbaxStore) => {
      for (let i = 0; i < targetAnswersIds.length; i += 1) {
        const targetAnswerId = targetAnswersIds[i];
        draft.removeReactionById(targetAnswerId, draft);
      }
    };

    return typeof workingDraft === 'undefined'
      ? withImmer(implementation)
      : implementation(workingDraft);
  },
});
