/* eslint-disable no-param-reassign */

import consola from '@feedbax/api/generic/logger';

import type { FeedbaxStore } from '@/lib/store/types';
import type { WithImmer, ImmerAction } from '@/lib/store/types';

enum ReactionsFilter {
  MostLiked,
  MostRecent,
  Mine,
}

interface AppStoreData {
  app: {
    currentQuestionId?: string;
    currentQuestionIndex: number;
    currentReactionsFilter: ReactionsFilter;
  };
}

interface AppStoreActions {
  resetApp: ImmerAction<() => void>;
  setReactionsFilter: ImmerAction<(filter: ReactionsFilter) => void>;
  nextQuestion: ImmerAction<() => void>;
  previousQuestion: ImmerAction<() => void>;
}

declare module '@/lib/store/types' {
  interface FeedbaxStoreData extends AppStoreData {}
  interface FeedbaxStoreActions extends AppStoreActions {}
}

type AppStore = AppStoreData & AppStoreActions;

const _: any = null;
const initial: AppStoreData = {
  app: {
    currentQuestionId: undefined,
    currentQuestionIndex: 0,
    currentReactionsFilter: ReactionsFilter.MostRecent,
  },
};

export const createAppStore = (withImmer: WithImmer): AppStore => ({
  app: initial.app,

  resetApp: withImmer((draft) => {
    consola.trace('FeedbaxStore', 'resetApp');
    draft.app = initial.app;
  }),

  setReactionsFilter: withImmer((draft, filter) => {
    consola.trace('FeedbaxStore', 'setReactionsFilter', { filter });
    draft.app.currentReactionsFilter = filter;
  }),

  nextQuestion: withImmer((draft) => {
    consola.trace('FeedbaxStore', 'nextQuestion');
    const lastQuestionIndex = draft.event.questionIds.length - 1;

    if (draft.app.currentQuestionIndex < lastQuestionIndex) {
      draft.app.currentQuestionIndex += 1;
      draft.app.currentQuestionId = draft.event.questionIds[draft.app.currentQuestionIndex];
    }
  }),

  previousQuestion: withImmer((draft) => {
    consola.trace('FeedbaxStore', 'previousQuestion');

    if (draft.app.currentQuestionIndex > 0) {
      draft.app.currentQuestionIndex -= 1;
      draft.app.currentQuestionId = draft.event.questionIds[draft.app.currentQuestionIndex];
    }
  }),
});

export const appSelectors = {
  currentQuestionId: (state: FeedbaxStore) => state.app.currentQuestionId,
  currentQuestionNumber: (state: FeedbaxStore) => `${state.app.currentQuestionIndex + 1}`.padStart(2, '0'),

  isFirstQuestion: (state: FeedbaxStore) => {
    const { currentQuestionIndex } = state.app;
    return currentQuestionIndex === 0;
  },

  isLastQuestion: (state: FeedbaxStore) => {
    const { currentQuestionIndex } = state.app;
    const { questionIds } = state.event;

    return currentQuestionIndex === questionIds.length - 1;
  },

  nextQuestion: (state: FeedbaxStore) => state.nextQuestion,
  previousQuestion: (state: FeedbaxStore) => state.previousQuestion,
};
