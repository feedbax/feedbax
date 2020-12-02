import { createSlice } from "@reduxjs/toolkit";

import { selectors as questionsSelectors } from "./questions";
import { createSelector } from "./selector";
import { generateAnswer } from "./seed";

import type { RootState } from "~store";
import type { PayloadAction } from "@reduxjs/toolkit";

export type AnswerState = {
  id: string;
  questionId: string;
  text: string;
  isMine: boolean;
  hasLiked: boolean;
  likesCount: number;
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

export const answersSlice = createSlice({
  name: "answer",

  initialState: {
    currentFilter: AnswersFilter.Recent,
    answers: new Array(100).fill(0).map((_, i) => generateAnswer(i)),
  } as AnswersState,

  reducers: {
    setCurrentFilter: (state, action: PayloadAction<AnswersFilter>) => {
      state.currentFilter = action.payload;
      return state;
    },
  },
});

export const actions = answersSlice.actions;

// prettier-ignore
const currentFilterSelector = (state: RootState) => state.answersState.currentFilter;
const answersSelector = (state: RootState) => state.answersState.answers;

const currentAnswersSelector = createSelector(
  answersSelector,
  currentFilterSelector,
  questionsSelectors.currentQuestionId,

  // prettier-ignore
  (answers, currentFilter, currentQuestionId) => (
    answers
      .filter(a => a.questionId === currentQuestionId)
    )
);

const currentAnswersIdsSelector = createSelector(
  currentAnswersSelector,
  answers => answers.map(a => a.id)
);

const answerByIdSelector = (answerId: string) =>
  createSelector(answersSelector, answers =>
    answers.filter(a => a.id === answerId)
  );

export const selectors = {
  currentFilter: currentFilterSelector,
  currentAnswers: currentAnswersSelector,
  currentAnswersIds: currentAnswersIdsSelector,
  answerById: answerByIdSelector,
};
