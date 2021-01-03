import type { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import type { DeepRequired, Merge } from 'ts-essentials';

import { feedbax } from '@feedbax/api';

export const QuestionType = feedbax.Model.Question.Type;

/* eslint-disable @typescript-eslint/indent */
export type QuestionState = (
  Merge<
    DeepRequired<feedbax.Model.IQuestion>,
    { answers: string[] }
  >
);
/* eslint-enable @typescript-eslint/indent */

export type QuestionsState = {
  currentIndex: number;

  questions: {
    [questionId: string]: QuestionState;
  };
};

export type Reducer<T> = CaseReducer<QuestionsState, PayloadAction<T>>;
