import { combineReducers, createStore } from 'redux';
import type { Action, Reducer } from 'redux';

import { eventsSlice } from './modules/event';
import { questionsSlice } from './modules/questions';
import { answersSlice } from './modules/answers';

type extractState<T> = T extends Reducer<infer X, Action<unknown>> ? X : never;

export const feedbaxReducer = combineReducers({
  eventsState: eventsSlice.reducer,
  questionsState: questionsSlice.reducer,
  answersState: answersSlice.reducer,
});

export type RootState = extractState<typeof feedbaxReducer>;
export const store = createStore(feedbaxReducer);
