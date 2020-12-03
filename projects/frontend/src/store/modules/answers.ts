import { createSlice } from "@reduxjs/toolkit";

import { selectors as questionsSelectors } from "./questions";
import { createSelector } from "./selector";
import { generateAnswer } from "./seed";

import type { RootState } from "~store";
import type { PayloadAction } from "@reduxjs/toolkit";
import memoize from "lodash.memoize";

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

export const answersSlice = createSlice({
  name: "answer",

  initialState: {
    currentFilter: AnswersFilter.Recent,
    answers: new Array(1000).fill(0).map((_, i) => generateAnswer(i)),
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
const answersMapSelector = (state: RootState) => {
  const answers = state.answersState.answers;
  const answersMap = new Map<string, AnswerState>();

  for (let i = 0; i < answers.length; i += 1) {
    const answer = answers[i];
    answersMap.set(answer.id, answer);
  }

  return answersMap;
};

type FilterAnswers = (
  answers: AnswerState[],
  filter: AnswersFilter
) => AnswerState[];
const filterAnswers: FilterAnswers = (answers, filter) => {
  switch (filter) {
    default:
    case AnswersFilter.Recent: {
      return answers;
    }

    case AnswersFilter.Mine: {
      return answers.filter(a => a.isMine);
    }

    case AnswersFilter.Liked: {
      return answers.sort((a, b) => b.likesCount - a.likesCount);
    }
  }
};

const currentAnswersSelector = createSelector(
  answersSelector,
  currentFilterSelector,
  questionsSelectors.currentQuestionId,

  // prettier-ignore
  (answers, currentFilter, currentQuestionId) => (
    filterAnswers(
      answers
        .filter(a => a.questionId === currentQuestionId)
        .sort((a, b) => b.created - a.created),

      currentFilter
    )
  )
);

const currentAnswersIdsSelector = createSelector(
  currentAnswersSelector,
  answers => answers.map(a => a.id)
);

const answerByIdSelector = createSelector(answersMapSelector, answersMap =>
  memoize((answerId: string) => answersMap.get(answerId))
);

const getCurrentAnswersIdsSelector = createSelector(
  currentAnswersIdsSelector,
  answers => memoize((count: number) => answers.slice(0, count))
);

export const selectors = {
  currentFilter: currentFilterSelector,
  currentAnswers: currentAnswersSelector,
  currentAnswersIds: currentAnswersIdsSelector,
  answerById: answerByIdSelector,
  getCurrentAnswersIds: getCurrentAnswersIdsSelector,
};
