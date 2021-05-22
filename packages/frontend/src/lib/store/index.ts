/* eslint-disable no-param-reassign */

import create from 'zustand';
import produce from 'immer';
import consola from '@feedbax/api/generic/logger';

import { createAppStore } from '@/lib/store/modules/app';
import { createEventStore } from '@/lib/store/modules/event';
import { createQuestionsStore } from '@/lib/store/modules/questions';
import { createReactionsStore } from '@/lib/store/modules/reactions';

import type { FeedbaxStore } from '@/lib/store/types';
import type { SetWithImmer, WithDraft, WithoutDraft } from '@/lib/store/types';
import type { ImmerAction, ImmerImplementation } from '@/lib/store/types';

export const useStore = create<FeedbaxStore>((set) => {
  function withImmer<T extends unknown[]>(
    implementation: ImmerImplementation<T>,
  ): ImmerAction<(...props: T) => void> {
    const immerSet: SetWithImmer = (fn) => set((state) => produce(state, fn));

    const withoutDraft: WithoutDraft<T> = (...props) => (
      immerSet((draft) => implementation(draft, ...props))
    );

    const withDraft: WithDraft<T> = (draft) => (
      (...props) => implementation(draft, ...props)
    );

    const action = withoutDraft as ImmerAction<(...props: T) => void>;
    action.withDraft = withDraft;

    return action;
  }

  return {
    ...createAppStore(withImmer),
    ...createEventStore(withImmer),
    ...createQuestionsStore(withImmer),
    ...createReactionsStore(withImmer),

    reset: withImmer((draft) => {
      consola.trace('FeedbaxStore', 'reset');

      draft.resetApp.withDraft(draft)();
      draft.resetEvent.withDraft(draft)();
      draft.resetQuestions.withDraft(draft);
      draft.resetReactions.withDraft(draft);
    }),
  };
});

export { default as selectors } from '@/lib/store/selectors';
