import type { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

export type AnswerState = {
  id: string;
  questionId: string;
  text: string;
  isMine: boolean;
  hasLiked: boolean;
  likesCount: number;
  created: number;
};

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
