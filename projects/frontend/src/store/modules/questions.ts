import { createSlice } from "@reduxjs/toolkit";
import { createSelectorCreator, defaultMemoize } from "reselect";
import { shallowEqual } from "react-redux";

import { LoremIpsum } from "lorem-ipsum";

import type { RootState } from "~store";
import type { PayloadAction } from "@reduxjs/toolkit";

export type QuestionState = {
  id: string;
  text: string;
  order: number;
};

export type QuestionsState = {
  currentIndex: number;
  questions: Array<QuestionState>;
};

const createSelector = createSelectorCreator(defaultMemoize, shallowEqual);
const lorem = new LoremIpsum({
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const generateQuestion = (order: number): QuestionState => ({
  order,
  id: `question-${order}`,
  text: lorem.generateSentences(1),
});

export const initialState: QuestionsState = {
  currentIndex: 0,
  questions: new Array(10).fill(0).map((_, i) => generateQuestion(i)),
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,

  reducers: {
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      const newIndex = state.currentIndex + action.payload;
      const newIndexBound = newIndex % state.questions.length;

      state.currentIndex = Math.abs(newIndexBound);

      return state;
    },
  },
});

export const actions = questionsSlice.actions;

const questionsSelector = createSelector(
  (state: RootState) => state.questionsState.questions,
  questions => [...questions].sort((q1, q2) => q1.order - q2.order)
);

// prettier-ignore
const questionsLengthSelector = (state: RootState) => state.questionsState.questions.length;
// prettier-ignore
const currentIndexSelector = (state: RootState) => state.questionsState.currentIndex;

const currentQuestionSelector = createSelector(
  currentIndexSelector,
  questionsSelector,
  (index, questions) => questions[index]
);

const currentQuestionIdSelector = createSelector(
  currentIndexSelector,
  questionsSelector,
  (index, questions) => questions[index].id
);

export const selectors = {
  currentIndex: currentIndexSelector,
  currentQuestion: currentQuestionSelector,
  currentQuestionId: currentQuestionIdSelector,
  questionsLength: questionsLengthSelector,
  questions: questionsSelector,
};
