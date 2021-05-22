/* eslint-disable no-param-reassign */

import consola from '@feedbax/api/generic/logger';

import type { Question, QuestionWith } from '@feedbax/api/models/question';
import type { WithImmer, ImmerAction } from '@/lib/store/types';

interface QuestionsStoreData {
  questions: {
    [questionId: string]: Question & {
      reactionIds: string[];
    };
  };
}

interface QuestionsStoreActions {
  resetQuestions: ImmerAction<() => void>;

  addQuestion: ImmerAction<(question: QuestionWith<'reactions?'>) => void>;
  addQuestions: ImmerAction<(questions: QuestionWith<'reactions?'>[]) => void>;

  removeQuestion: ImmerAction<(targetQuestion: Question) => void>;
  removeQuestionById: ImmerAction<(targetQuestionId: string) => void>;

  removeQuestions: ImmerAction<(targetQuestions: Question[]) => void>;
  removeQuestionsById: ImmerAction<(targetQuestionIds: string[]) => void>;
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

  resetQuestions: withImmer((draft) => {
    consola.trace('FeedbaxStore', 'resetQuestions');
    draft.questions = initial.questions;
  }),

  addQuestion: withImmer((draft, question) => {
    consola.trace('FeedbaxStore', 'addQuestion', { question });

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

    draft.addReactions.withDraft(draft)(reactions ?? []);
  }),

  addQuestions: withImmer((draft, questions) => {
    consola.trace('FeedbaxStore', 'addQuestions', { questions });

    for (let i = 0; i < questions.length; i += 1) {
      const question = questions[i];

      if (typeof question !== 'undefined') {
        draft.addQuestion.withDraft(draft)(question);
      }
    }
  }),

  removeQuestion: withImmer((draft, targetQuestion) => {
    consola.trace('FeedbaxStore', 'removeQuestion', { targetQuestion });
    draft.removeQuestionById.withDraft(draft)(targetQuestion.id);
  }),

  removeQuestionById: withImmer((draft, targetQuestionId) => {
    consola.trace('FeedbaxStore', 'removeQuestionById', { targetQuestionId });

    const questionIdIndex = draft.event.questionIds
      .findIndex((questionId) => questionId === targetQuestionId);

    if (questionIdIndex !== -1) {
      draft.event.questionIds.splice(questionIdIndex, 1);
    }

    const question = draft.questions[targetQuestionId];

    if (typeof question !== 'undefined') {
      for (let i = 0; i < question.reactionIds.length; i += 1) {
        const reactionId = question.reactionIds[i];
        const reaction = draft.reactions[reactionId];

        if (typeof reaction !== 'undefined') {
          draft.removeReaction.withDraft(draft)(reaction);
        }
      }

      delete draft.questions[targetQuestionId];
    }
  }),

  removeQuestions: withImmer((draft, targetQuestions) => {
    consola.trace('FeedbaxStore', 'removeQuestions', { targetQuestions });

    const questionIds = targetQuestions.map((question) => question.id);
    draft.removeQuestionsById.withDraft(draft)(questionIds);
  }),

  removeQuestionsById: withImmer((draft, targetQuestionIds) => {
    consola.trace('FeedbaxStore', 'removeQuestionsById', { targetQuestionIds });

    for (let i = 0; i < targetQuestionIds.length; i += 1) {
      const targetQuestionId = targetQuestionIds[i];
      draft.removeQuestionById.withDraft(draft)(targetQuestionId);
    }
  }),
});
