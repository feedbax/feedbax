import { combineReducers, createStore } from 'redux';
import type { Action, Reducer } from 'redux';

import { eventsSlice } from './modules/event';
import { questionsSlice } from './modules/questions';
import { answersSlice } from './modules/answers';

type extractState<T> = T extends Reducer<infer X, Action<unknown>> ? X : never;

export const rootReducer = combineReducers({
  eventsState: eventsSlice.reducer,
  questionsState: questionsSlice.reducer,
  answersState: answersSlice.reducer,
});

export type RootState = extractState<typeof rootReducer>;
export const store = createStore(rootReducer);
