/* eslint-disable no-param-reassign */

import consola from '@feedbax/api/generic/logger';

import type { CreateStore } from '@/lib/store/types';
import type { WithImmer, ImmerAction } from '@/lib/store/types';

enum ReactionsFilter {
  MostLiked,
  MostRecent,
  Mine,
}

type AppStoreData = {
  reactionsFilter: {
    current: ReactionsFilter;
  };
};

type AppStoreActions = {
  reset: ImmerAction<() => void>;
  reactionsFilter: {
    setCurrent: ImmerAction<(filter: ReactionsFilter) => void>;
  };
};

type AppStore =
  CreateStore<'app', AppStoreData, AppStoreActions>;

declare module '@/lib/store/types' {
  interface FeedbaxStore extends AppStore {}
}

const initial: AppStoreData = {
  reactionsFilter: {
    current: ReactionsFilter.MostRecent,
  },
};

export const createAppStore = (
  (withImmer: WithImmer): AppStore => ({
    app: {
      state: initial,

      actions: {
        reset: withImmer((draft) => {
          consola.trace('FeedbaxStore', 'resetApp');
          draft.app.state = initial;
        }),

        reactionsFilter: {
          setCurrent: withImmer((draft, filter) => {
            consola.trace('FeedbaxStore', 'setReactionsFilter', { filter });
            draft.app.state.reactionsFilter.current = filter;
          }),
        },
      },
    },
  })
);

export const selectors = {
  app: {},
};
