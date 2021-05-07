import create from 'zustand';
import produce from 'immer';

import { Event } from '@feedbax/prisma';
import { Question } from '@feedbax/prisma';

type FeedbaxStore = {
  event: Event & {
    questionIds: string[];
  };

  questions: {
    [questionId: string]: Question & {
      answerIds: string[];
    };
  };

  addQuestion: (question: Question) => void;
  addQuestions: (questions: Question[]) => void;
  removeQuestion: (targetQuestionId: string) => void;
};

const _: any = null;

export const useStore = create<FeedbaxStore>((set) => {
  type DraftFn = (draft: FeedbaxStore) => void;
  const ims = (fn: DraftFn) => set((state) => produce(state, fn));

  return {
    event: {
      id: _ as string,
      slug: _ as string,
      userId: _ as string,

      questionIds: [],
    },

    questions: {},

    addQuestion: (question) => ims((draft) => {
      draft.event.questionIds.push(question.id);

      // eslint-disable-next-line no-param-reassign
      draft.questions[question.id] = {
        ...question, answerIds: [],
      };
    }),

    addQuestions: (questions) => ims((draft) => {
      const questionIds = questions.map((q) => q.id);

      draft.event.questionIds.push(...questionIds);

      for (let i = 0; i < questions.length; i += 1) {
        const question = questions[i];

        // eslint-disable-next-line no-param-reassign
        draft.questions[question.id] = {
          ...question, answerIds: [],
        };
      }
    }),

    removeQuestion: (targetQuestionId) => ims((draft) => {
      // eslint-disable-next-line no-param-reassign
      draft.event.questionIds = draft.event.questionIds
        .filter((questionId) => (
          questionId !== targetQuestionId
        ));

      // eslint-disable-next-line no-param-reassign
      delete draft.questions[targetQuestionId];
    }),
  };
});
