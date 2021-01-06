import type { AnswersFilter, Reducer } from './types';

const setCurrentFilter: Reducer<AnswersFilter> = (
  (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.currentFilter = action.payload;
    return state;
  }
);

export default {
  setCurrentFilter,
};
