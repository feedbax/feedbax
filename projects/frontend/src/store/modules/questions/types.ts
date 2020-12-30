import type { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { feedbax } from '@feedbax/api';

export const QuestionType = feedbax.Model.Question.Type;

/* eslint-disable @typescript-eslint/indent */
export type QuestionState = (
  Required<
    Omit<
      feedbax.Model.Question,
      'toJSON' | 'answers'
    >
  >
);
/* eslint-enable @typescript-eslint/indent */

export type QuestionsState = {
  currentIndex: number;
  questions: Array<QuestionState>;
};

export type Reducer<T> = CaseReducer<QuestionsState, PayloadAction<T>>;
