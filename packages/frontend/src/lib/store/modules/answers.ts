/* eslint-disable no-param-reassign */

import consola from '@feedbax/api/generic/logger';

import type { Answer } from '@feedbax/api/models/answer';
import type { FeedbaxStore, WithImmer } from '@/lib/store/types';

interface AnswersStoreData {
  answers: {
    [answerId: string]: Answer & {
      questionId: string;
    };
  };
}

interface AnswersStoreActions {
  resetAnswers: (draft?: FeedbaxStore) => void;

  addAnswer: (answer: Answer, draft?: FeedbaxStore) => void;
  addAnswers: (answers: Answer[], draft?: FeedbaxStore) => void;

  removeAnswer: (targetAnswer: Answer, draft?: FeedbaxStore) => void;
  removeAnswerById: (targetAnswerId: string, draft?: FeedbaxStore) => void;

  removeAnswers: (targetAnswers: Answer[], draft?: FeedbaxStore) => void;
  removeAnswersByIds: (targetAnswerIds: string[], draft?: FeedbaxStore) => void;
}

declare module '@/lib/store/types' {
  interface FeedbaxStoreData extends AnswersStoreData {}
  interface FeedbaxStoreActions extends AnswersStoreActions {}
}

type AnswersStore = AnswersStoreData & AnswersStoreActions;

const initial: AnswersStoreData = {
  answers: {},
};

export const createAnswersStore = (withImmer: WithImmer): AnswersStore => ({
  answers: initial.answers,

  resetAnswers: (workingDraft) => {
    consola.trace('FeedbaxStore', 'resetAnswers', { workingDraft });

    const implementation = (draft: FeedbaxStore) => {
      draft.answers = initial.answers;
    };

    return typeof workingDraft === 'undefined'
      ? withImmer(implementation)
      : implementation(workingDraft);
  },

  addAnswer: (answer, workingDraft) => {
    consola.trace('FeedbaxStore', 'addAnswer', { answer, workingDraft });

    const implementation = (draft: FeedbaxStore) => {
      const question = draft.questions[answer.questionId];

      if (typeof question !== 'undefined') {
        question.answerIds ??= [];
        question.answerIds.push(answer.id);
      }

      draft.answers[answer.id] = answer;
    };

    return typeof workingDraft === 'undefined'
      ? withImmer(implementation)
      : implementation(workingDraft);
  },

  addAnswers: (answers, workingDraft) => {
    consola.trace('FeedbaxStore', 'addAnswers', { answers, workingDraft });

    const implementation = (draft: FeedbaxStore) => {
      for (let i = 0; i < answers.length; i += 1) {
        const answer = answers[i];

        if (typeof answer !== 'undefined') {
          draft.addAnswer(answer, draft);
        }
      }
    };

    return typeof workingDraft === 'undefined'
      ? withImmer(implementation)
      : implementation(workingDraft);
  },

  removeAnswer: (targetAnswer, workingDraft) => {
    consola.trace('FeedbaxStore', 'removeAnswer', { targetAnswer, workingDraft });

    const implementation = (draft: FeedbaxStore) => {
      draft.removeAnswerById(targetAnswer.id, draft);
    };

    return typeof workingDraft === 'undefined'
      ? withImmer(implementation)
      : implementation(workingDraft);
  },

  removeAnswerById: (targetAnswerId, workingDraft) => {
    consola.trace('FeedbaxStore', 'removeAnswerById', { targetAnswerId, workingDraft });

    const implementation = (draft: FeedbaxStore) => {
      const answer = draft.answers[targetAnswerId];

      if (typeof answer !== 'undefined') {
        const question = draft.questions[answer.questionId];

        if (typeof question !== 'undefined') {
          const answerIdIndex = question.answerIds
            .findIndex((answerId) => answerId === targetAnswerId);

          if (answerIdIndex !== -1) {
            question.answerIds.splice(answerIdIndex, 1);
          }
        }

        delete draft.answers[targetAnswerId];
      }

      return draft;
    };

    return typeof workingDraft === 'undefined'
      ? withImmer(implementation)
      : implementation(workingDraft);
  },

  removeAnswers: (targetAnswers, workingDraft) => {
    consola.trace('FeedbaxStore', 'removeAnswers', { targetAnswers, workingDraft });

    const implementation = (draft: FeedbaxStore) => {
      const targetAnswersIds = targetAnswers.map((answer) => answer.id);
      draft.removeAnswersByIds(targetAnswersIds, draft);
    };

    return typeof workingDraft === 'undefined'
      ? withImmer(implementation)
      : implementation(workingDraft);
  },

  removeAnswersByIds: (targetAnswersIds, workingDraft) => {
    consola.trace('FeedbaxStore', 'removeAnswersByIds', { targetAnswersIds, workingDraft });

    const implementation = (draft: FeedbaxStore) => {
      for (let i = 0; i < targetAnswersIds.length; i += 1) {
        const targetAnswerId = targetAnswersIds[i];
        draft.removeAnswerById(targetAnswerId, draft);
      }
    };

    return typeof workingDraft === 'undefined'
      ? withImmer(implementation)
      : implementation(workingDraft);
  },
});
