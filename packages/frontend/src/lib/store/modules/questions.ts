/* eslint-disable no-param-reassign */

import consola from '@feedbax/api/generic/logger';

import type { Question, QuestionWith } from '@feedbax/api/models/question';
import type { FeedbaxStore, WithImmer } from '@/lib/store/types';

interface QuestionsStoreData {
  questions: {
    [questionId: string]: Question & {
      answerIds: string[];
    };
  };
}

interface QuestionsStoreActions {
  resetQuestions: (draft?: FeedbaxStore) => void;

  addQuestion: (question: QuestionWith<'reactions?'>, draft?: FeedbaxStore) => void;
  addQuestions: (questions: QuestionWith<'reactions?'>[], draft?: FeedbaxStore) => void;

  removeQuestion: (targetQuestion: Question, draft?: FeedbaxStore) => void;
  removeQuestionById: (targetQuestionId: string, draft?: FeedbaxStore) => void;

  removeQuestions: (targetQuestions: Question[], draft?: FeedbaxStore) => void;
  removeQuestionsById: (targetQuestionIds: string[], draft?: FeedbaxStore) => void;
}

declare module '@/lib/store/types' {
  interface FeedbaxStoreData extends QuestionsStoreData {}
  interface FeedbaxStoreActions extends QuestionsStoreActions {}
}

type QuestionsStore = QuestionsStoreData & QuestionsStoreActions;

const initial: QuestionsStoreData = {
  questions: {},
};

export const createQuestionsStore = (withImmer: WithImmer): QuestionsStore => ({
  questions: initial.questions,

  resetQuestions: (workingDraft) => {
    consola.trace('FeedbaxStore', 'resetQuestions', { workingDraft });

    const implementation = (draft: FeedbaxStore) => {
      draft.questions = initial.questions;
    };

    return typeof workingDraft === 'undefined'
      ? withImmer(implementation)
      : implementation(workingDraft);
  },

  addQuestion: (question, workingDraft) => {
    consola.trace('FeedbaxStore', 'addQuestion', { question, workingDraft });

    const implementation = (draft: FeedbaxStore) => {
      const { reactions, ...questionRest } = question;

      draft.questions[question.id] = {
        ...draft.questions[question.id],
        ...questionRest,
      };

      draft.event.questionIds.push(question.id);
      draft.event.questionIds.sort((qIdA, qIdB) => {
        const questionA = draft.questions[qIdA];
        const questionB = draft.questions[qIdB];

        return questionA.order - questionB.order;
      });

      draft.addReactions(reactions ?? [], draft);
    };

    return typeof workingDraft === 'undefined'
      ? withImmer(implementation)
      : implementation(workingDraft);
  },

  addQuestions: (questions, workingDraft) => {
    consola.trace('FeedbaxStore', 'addQuestions', { questions, workingDraft });

    const implementation = (draft: FeedbaxStore) => {
      for (let i = 0; i < questions.length; i += 1) {
        const question = questions[i];

        if (typeof question !== 'undefined') {
          draft.addQuestion(question, draft);
        }
      }
    };

    return typeof workingDraft === 'undefined'
      ? withImmer(implementation)
      : implementation(workingDraft);
  },

  removeQuestion: (targetQuestion, workingDraft) => {
    consola.trace('FeedbaxStore', 'removeQuestion', { targetQuestion, workingDraft });

    const implementation = (draft: FeedbaxStore) => {
      draft.removeQuestionById(targetQuestion.id, draft);
    };

    return typeof workingDraft === 'undefined'
      ? withImmer(implementation)
      : implementation(workingDraft);
  },

  removeQuestionById: (targetQuestionId, workingDraft) => {
    consola.trace('FeedbaxStore', 'removeQuestionById', { targetQuestionId, workingDraft });

    const implementation = (draft: FeedbaxStore) => {
      const questionIdIndex = draft.event.questionIds
        .findIndex((questionId) => questionId === targetQuestionId);

      if (questionIdIndex !== -1) {
        draft.event.questionIds.splice(questionIdIndex, 1);
      }

      const question = draft.questions[targetQuestionId];

      if (typeof question !== 'undefined') {
        for (let i = 0; i < question.answerIds.length; i += 1) {
          const answerId = question.answerIds[i];
          const answer = draft.reactions[answerId];

          if (typeof answer !== 'undefined') {
            draft.removeReaction(answer, draft);
          }
        }

        delete draft.questions[targetQuestionId];
      }
    };

    return typeof workingDraft === 'undefined'
      ? withImmer(implementation)
      : implementation(workingDraft);
  },

  removeQuestions: (targetQuestions, workingDraft) => {
    consola.trace('FeedbaxStore', 'removeQuestions', { targetQuestions, workingDraft });

    const implementation = (draft: FeedbaxStore) => {
      const questionIds = targetQuestions.map((question) => question.id);
      draft.removeQuestionsById(questionIds, draft);
    };

    return typeof workingDraft === 'undefined'
      ? withImmer(implementation)
      : implementation(workingDraft);
  },

  removeQuestionsById: (targetQuestionIds, workingDraft) => {
    consola.trace('FeedbaxStore', 'removeQuestionsById', { targetQuestionIds, workingDraft });

    const implementation = (draft: FeedbaxStore) => {
      for (let i = 0; i < targetQuestionIds.length; i += 1) {
        const targetQuestionId = targetQuestionIds[i];
        draft.removeQuestionById(targetQuestionId, draft);
      }
    };

    return typeof workingDraft === 'undefined'
      ? withImmer(implementation)
      : implementation(workingDraft);
  },
});
