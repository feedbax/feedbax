import type { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import type { feedbax } from '@feedbax/api';

/* eslint-disable @typescript-eslint/indent */
export type AnswerModel = (
  Required<
    Omit<
      feedbax.Model.Answer,
      'toJSON'
    >
  >
);
/* eslint-enable @typescript-eslint/indent */

export type AnswerState = (
  AnswerModel & {
    questionId: string;
  }
);

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

export type AnswersState = {
  currentFilter: AnswersFilter;
  answers: Array<AnswerState>;
};

export type Reducer<T> = CaseReducer<AnswersState, PayloadAction<T>>;
