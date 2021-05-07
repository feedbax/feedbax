import create from 'zustand';
import produce from 'immer';

import { Event } from '@feedbax/prisma';

type EventStore = Event & {
  questionIds: string[];

  addQuestion: (questionId: string) => void;
  addQuestions: (questionId: string[]) => void;

  removeQuestion: (targetQuestionId: string) => void;
};

const _: any = null;

export const useEvent = create<EventStore>((set) => {
  type DraftFn = (draft: EventStore) => void;
  const ims = (fn: DraftFn) => set((state) => produce(state, fn));

  return {
    id: _ as string,
    slug: _ as string,
    userId: _ as string,

    questionIds: [],

    addQuestion: (questionId) => ims((state) => {
      state.questionIds.push(questionId);
    }),

    addQuestions: (questionIds) => ims((state) => {
      state.questionIds.push(...questionIds);
    }),

    removeQuestion: (targetQuestionId) => ims((draft) => {
      // eslint-disable-next-line no-param-reassign
      draft.questionIds = draft.questionIds.filter((questionId) => (
        questionId !== targetQuestionId
      ));
    }),
  };
});
