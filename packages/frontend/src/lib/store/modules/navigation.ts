/* eslint-disable no-param-reassign */

import consola from '@feedbax/api/generic/logger';

import type { CreateStore, CreateSelectors, Selector } from '@/lib/store/types';
import type { WithImmer, ImmerAction } from '@/lib/store/types';

type NavigationStoreData = {
  questionId?: string;
  questionIndex: number;
};

type NavigationStoreActions = {
  reset: ImmerAction<() => void>;
  next: ImmerAction<() => void>;
  previous: ImmerAction<() => void>;
};

type NavigationStoreSelectors = {
  questionId: Selector<NavigationStoreData['questionId']>;
  questionNumber: Selector<string>;

  isFirst: Selector<boolean>;
  isLast: Selector<boolean>;

  next: Selector<NavigationStoreActions['next']>;
  previous: Selector<NavigationStoreActions['previous']>;
};

type ModuleName = 'navigation';

type NavigationStore =
  CreateStore<ModuleName, NavigationStoreData, NavigationStoreActions>;

type NavigationSelectors =
  CreateSelectors<ModuleName, NavigationStoreSelectors>;

declare module '@/lib/store/types' {
  interface FeedbaxStore extends NavigationStore {}
}

const initial: NavigationStoreData = {
  questionId: undefined,
  questionIndex: 0,
};

export const createNavigationStore = (
  (withImmer: WithImmer): NavigationStore => ({
    navigation: {
      state: initial,

      actions: {
        reset: withImmer((draft) => {
          consola.trace('FeedbaxStore', 'resetApp');
          draft.navigation.state = initial;
        }),

        next: withImmer((draft) => {
          consola.trace('FeedbaxStore', 'nextQuestion');

          const { questionIds } = draft.event.state;
          const { questionIndex } = draft.navigation.state;

          const largestPossibleIndex = questionIds.length - 1;

          if (questionIndex < largestPossibleIndex) {
            const newIndex = questionIndex + 1;

            draft.navigation.state.questionIndex = newIndex;
            draft.navigation.state.questionId = questionIds[newIndex];
          }
        }),

        previous: withImmer((draft) => {
          consola.trace('FeedbaxStore', 'previousQuestion');

          const { questionIndex } = draft.navigation.state;
          const { questionIds } = draft.event.state;

          if (questionIndex > 0) {
            const newIndex = questionIndex - 1;

            draft.navigation.state.questionIndex = newIndex;
            draft.navigation.state.questionId = questionIds[newIndex];
          }
        }),
      },
    },
  })
);

export const selectors: NavigationSelectors = {
  navigation: {
    questionId: (store) => store.navigation.state.questionId,
    questionNumber: (store) => {
      const { questionIndex } = store.navigation.state;
      const questionNumber = `${questionIndex + 1}`;

      return questionNumber.padStart(2, '0');
    },

    isFirst: (store) => {
      const { questionIndex } = store.navigation.state;
      return questionIndex === 0;
    },

    isLast: (store) => {
      const { questionIndex } = store.navigation.state;
      const { questionIds } = store.event.state;
      const largestPossibleIndex = questionIds.length - 1;

      return questionIndex === largestPossibleIndex;
    },

    next: (store) => store.navigation.actions.next,
    previous: (store) => store.navigation.actions.previous,
  },
};
