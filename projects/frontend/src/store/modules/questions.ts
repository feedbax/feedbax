import { createSlice } from "@reduxjs/toolkit";

import { generateQuestion } from "./seed";
import { createSelector } from "./selector";

import type { RootState } from "~store";
import type { PayloadAction } from "@reduxjs/toolkit";
import memoize from "lodash.memoize";

export type QuestionState = {
  id: string;
  text: string;
  order: number;
};

export type QuestionsState = {
  currentIndex: number;
  questions: Array<QuestionState>;
};

export const initialState: QuestionsState = {
  currentIndex: 0,
  questions: new Array(10).fill(0).map((_, i) => generateQuestion(i)),
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,

  reducers: {
    addToCurrentIndex: (state, action: PayloadAction<number>) => {
      const questionsCount = state.questions.length;

      const minIndex = 0;
      const maxIndex = questionsCount - 1;

      let newIndex = state.currentIndex + action.payload;

      newIndex = newIndex <= minIndex ? minIndex : newIndex;
      newIndex = newIndex > maxIndex ? maxIndex : newIndex;

      state.currentIndex = newIndex;

      return state;
    },

    setCurrentIndex: (state, action: PayloadAction<number>) => {
      const questionsCount = state.questions.length;

      const minIndex = 0;
      const maxIndex = questionsCount - 1;

      let newIndex = action.payload;

      newIndex = newIndex <= minIndex ? minIndex : newIndex;
      newIndex = newIndex > maxIndex ? maxIndex : newIndex;

      state.currentIndex = newIndex;

      return state;
    },
  },
});

export const actions = questionsSlice.actions;

const questionsSelector = (state: RootState) => state.questionsState.questions;

// prettier-ignore
const questionsOrderedSelector = createSelector(
  questionsSelector,
  questions => [...questions].sort((q1, q2) => q1.order - q2.order)
);

// prettier-ignore
const questionsIdsSelector = createSelector(
  questionsSelector,
  questions => questions.map(q => q.id)
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

const questionsMapSelector = (state: RootState) => {
  const questions = state.questionsState.questions;
  const questionsMap = new Map<string, QuestionState>();

  for (let i = 0; i < questions.length; i += 1) {
    const question = questions[i];
    questionsMap.set(question.id, question);
  }

  return questionsMap;
};

// prettier-ignore
const questionByIdSelector = createSelector(
  questionsMapSelector,
  questions => memoize((questionId: string) => questions.get(questionId))
);

export const selectors = {
  currentIndex: currentIndexSelector,
  currentQuestion: currentQuestionSelector,
  currentQuestionId: currentQuestionIdSelector,
  questionsLength: questionsLengthSelector,
  questions: questionsSelector,
  questionsOrdered: questionsOrderedSelector,
  questionsIds: questionsIdsSelector,
  questionById: questionByIdSelector,
};
