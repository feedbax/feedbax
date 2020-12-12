import type { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

export type QuestionState = {
  id: string;
  text: string;
  order: number;
};

export type QuestionsState = {
  currentIndex: number;
  questions: Array<QuestionState>;
};

export type Reducer<T> = CaseReducer<QuestionsState, PayloadAction<T>>;
