import { combineReducers, createStore } from 'redux';
import type { Action, Reducer } from 'redux';

import { questionsSlice } from './modules/questions';
import { answersSlice } from './modules/answers';

type extractState<T> = T extends Reducer<infer X, Action<unknown>> ? X : never;

export const gameReducer = combineReducers({
  questionsState: questionsSlice.reducer,
  answersState: answersSlice.reducer,
});

export type RootState = extractState<typeof gameReducer>;
export const store = createStore(gameReducer);
