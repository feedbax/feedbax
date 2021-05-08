/* eslint-disable no-param-reassign */

import create from 'zustand';
import produce from 'immer';
import consola from '@feedbax/api/generic/logger';

import type { Event } from '@feedbax/api/models/event';
import type { Question, QuestionWith } from '@feedbax/api/models/question';

type LoginPacketData = import('@feedbax/api/client/packets/login').PacketData;

type FeedbaxStore = {
  event: Event & {
    questionIds: string[];
  };

  questions: {
    [questionId: string]: Question & {
      answerIds: string[];
    };
  };

  loadEvent: (event: LoginPacketData) => void;

  addQuestion: (question: QuestionWith<'answers?'>, draft?: FeedbaxStore) => void;
  addQuestions: (questions: QuestionWith<'answers?'>[], draft?: FeedbaxStore) => void;
  removeQuestion: (targetQuestionId: string, draft?: FeedbaxStore) => void;
};

const _: any = null;

export const useStore = create<FeedbaxStore>((set) => {
  type DraftFn = (draft: FeedbaxStore) => void;
  const withImmer = (fn: DraftFn) => set((state) => produce(state, fn));

  return {
    event: {
      id: _ as string,
      slug: _ as string,

      questionIds: [],
    },

    questions: {},

    loadEvent: (event) => withImmer((draft) => {
      consola.trace('FeedbaxStore', 'loadEvent', { event });

      draft.event.id = event.id;
      draft.event.slug = event.slug;

      draft.addQuestions(event.questions, draft);
    }),

    addQuestion: (question, workingDraft) => {
      consola.trace('FeedbaxStore', 'addQuestion', { question, workingDraft });

      const implementation = (draft: FeedbaxStore) => {
        const answerIds = question.answers?.map((a) => a.id) ?? [];
        delete question.answers;

        draft.event.questionIds.push(question.id);
        draft.questions[question.id] = {
          ...question,
          answerIds,
        };
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

    removeQuestion: (targetQuestionId, workingDraft) => {
      consola.trace('FeedbaxStore', 'removeQuestion', { targetQuestionId, workingDraft });

      const implementation = (draft: FeedbaxStore) => {
        draft.event.questionIds = draft.event.questionIds
          .filter((questionId) => (
            questionId !== targetQuestionId
          ));

        delete draft.questions[targetQuestionId];
      };

      return typeof workingDraft === 'undefined'
        ? withImmer(implementation)
        : implementation(workingDraft);
    },
  };
});
