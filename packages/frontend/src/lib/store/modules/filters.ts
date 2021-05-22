/* eslint-disable no-param-reassign */

import consola from '@feedbax/api/generic/logger';

import type { CreateStore, CreateSelectors, Selector } from '@/lib/store/types';
import type { WithImmer, ImmerAction } from '@/lib/store/types';

export enum ReactionsFilter {
  MostLiked,
  MostRecent,
  Mine,
}

type FiltersStoreData = {
  current: ReactionsFilter;
};

type FiltersStoreActions = {
  reset: ImmerAction<() => void>;
  setCurrent: ImmerAction<(filter: ReactionsFilter) => void>;
};

type FiltersStoreSelectors = {
  current: Selector<ReactionsFilter>;
  setCurrent: Selector<FiltersStoreActions['setCurrent']>;
};

type ModuleName = 'filters';

type FiltersStore =
  CreateStore<ModuleName, FiltersStoreData, FiltersStoreActions>;

type FiltersSelectors =
  CreateSelectors<ModuleName, FiltersStoreSelectors>;

declare module '@/lib/store/types' {
  interface FeedbaxStore extends FiltersStore {}
}

const initial: FiltersStoreData = {
  current: ReactionsFilter.MostRecent,
};

export const createFiltersStore = (
  (withImmer: WithImmer): FiltersStore => ({
    filters: {
      state: initial,

      actions: {
        reset: withImmer((draft) => {
          consola.trace('store.filters.actions.reset');
          draft.filters.state = initial;
        }),

        setCurrent: withImmer((draft, filter) => {
          consola.trace('store.filters.actions.setCurrent', { filter });
          draft.filters.state.current = filter;
        }),
      },
    },
  })
);

export const selectors: FiltersSelectors = {
  filters: {
    current: (store) => store.filters.state.current,
    setCurrent: (store) => store.filters.actions.setCurrent,
  },
};
