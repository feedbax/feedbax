import { combineReducers, createStore, Reducer } from "redux"

import { questionsSlice } from "./modules/questions"

type extractState<T> = T extends Reducer<infer X, any> ? X : never

export const gameReducer = combineReducers({
  questionsState: questionsSlice.reducer,
})

export type RootState = extractState<typeof gameReducer>
export const store = createStore(gameReducer)
