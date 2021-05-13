/* eslint-disable no-param-reassign */

import create from 'zustand';
import produce from 'immer';
import consola from '@feedbax/api/generic/logger';

import { createEventStore } from '@/store/modules/event';
import { createQuestionsStore } from '@/store/modules/questions';
import { createAnswersStore } from '@/store/modules/answers';
import { createAppStore } from '@/store/modules/app';

import type { FeedbaxStore, WithImmer } from '@/store/types';

export const useStore = create<FeedbaxStore>((set) => {
  const withImmer: WithImmer = (fn) => set((state) => produce(state, fn));

  return {
    ...createEventStore(withImmer),
    ...createQuestionsStore(withImmer),
    ...createAnswersStore(withImmer),
    ...createAppStore(withImmer),

    reset: () => withImmer((draft) => {
      consola.trace('FeedbaxStore', 'reset');

      draft.resetApp(draft);
      draft.resetEvent(draft);
      draft.resetQuestions(draft);
      draft.resetAnswers(draft);
    }),
  };
});

export { default as selectors } from '@/store/selectors';
