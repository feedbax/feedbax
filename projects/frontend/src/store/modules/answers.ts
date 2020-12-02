import { createSlice } from "@reduxjs/toolkit";
import { createSelectorCreator, defaultMemoize } from "reselect";
import { shallowEqual } from "react-redux";

import { LoremIpsum } from "lorem-ipsum";

import { WORDS } from "lorem-ipsum/src/constants/words";
import emojis from "~assets/emoji-compact.json";

import { initialState, selectors as questionsSelectors } from "./questions";

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

const createSelector = createSelectorCreator(defaultMemoize, shallowEqual);
const lorem = new LoremIpsum({
  wordsPerSentence: {
    max: 26,
    min: 4,
  },
  words: [...new Array(1000).fill(WORDS).flat(), ...emojis],
});

// prettier-ignore
const randomIntBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomBool = () => Math.random() > 0.5;
const randomInt = () => Math.round(Math.random() * 100);

const generateAnswer = (index: number): AnswerState => ({
  id: `answer-${index}`,
  // prettier-ignore
  questionId: `question-${randomIntBetween(0, initialState.questions.length - 1)}`,
  text: lorem.generateSentences(1),
  isMine: randomBool(),
  hasLiked: randomBool(),
  likesCount: randomInt(),
});

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
