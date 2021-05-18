/* eslint-disable no-param-reassign */

import create from 'zustand';
import produce from 'immer';
import consola from '@feedbax/api/generic/logger';

import { createEventStore } from '@/lib/store/modules/event';
import { createQuestionsStore } from '@/lib/store/modules/questions';
import { createAnswersStore } from '@/lib/store/modules/answers';
import { createAppStore } from '@/lib/store/modules/app';

import type { FeedbaxStore, WithImmer } from '@/lib/store/types';

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

export { default as selectors } from '@/lib/store/selectors';
