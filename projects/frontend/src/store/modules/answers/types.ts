import type { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import type { DeepRequired } from 'ts-essentials';

import type { feedbax } from '@feedbax/api';

export enum AnswersFilter {
  Liked,
  Recent,
  Mine,
}

export const answerFilters = [
  AnswersFilter.Liked,
  AnswersFilter.Recent,
  AnswersFilter.Mine,
] as const;

export type AnswerState = DeepRequired<feedbax.Model.IAnswer>;

export type AnswersState = {
  currentFilter: AnswersFilter;

  answers: {
    [answerId: string]: AnswerState;
  };
};

export type Reducer<T> = CaseReducer<AnswersState, PayloadAction<T>>;
