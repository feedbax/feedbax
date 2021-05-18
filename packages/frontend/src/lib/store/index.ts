/* eslint-disable no-param-reassign */

import create from 'zustand';
import produce from 'immer';
import consola from '@feedbax/api/generic/logger';

import { createAppStore } from '@/lib/store/modules/app';
import { createEventStore } from '@/lib/store/modules/event';
import { createQuestionsStore } from '@/lib/store/modules/questions';
import { createReactionsStore } from '@/lib/store/modules/reactions';

import type { FeedbaxStore, WithImmer } from '@/lib/store/types';

export const useStore = create<FeedbaxStore>((set) => {
  const withImmer: WithImmer = (fn) => set((state) => produce(state, fn));

  return {
    ...createAppStore(withImmer),
    ...createEventStore(withImmer),
    ...createQuestionsStore(withImmer),
    ...createReactionsStore(withImmer),

    reset: () => withImmer((draft) => {
      consola.trace('FeedbaxStore', 'reset');

      draft.resetApp(draft);
      draft.resetEvent(draft);
      draft.resetQuestions(draft);
      draft.resetReactions(draft);
    }),
  };
});

export { default as selectors } from '@/lib/store/selectors';
