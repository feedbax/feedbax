import { createSlice } from "@reduxjs/toolkit";
import { createSelectorCreator, defaultMemoize } from "reselect";
import { shallowEqual } from "react-redux";

const createSelector = createSelectorCreator(defaultMemoize, shallowEqual);

import type { RootState } from "~store";
import type { PayloadAction } from "@reduxjs/toolkit";

export type QuestionState = {
  text: string;
  order: number;
};

export type QuestionsState = {
  currentIndex: number;
  questions: Array<QuestionState>;
};

export const questionsSlice = createSlice({
  name: "questions",

  initialState: {
    currentIndex: 0,

    questions: [
      // prettier-ignore
      { order: -1, text: "Was kommt mindestens ein­mal in der Wo­che in dei­nen Ge­be­ten vor? Was kommt mindestens ein­mal in der Wo­che in dei­nen Ge­be­ten vor?" },
      // prettier-ignore
      { order: 0, text: "Was kommt mindestens ein­mal in der Wo­che in dei­nen Ge­be­ten vor?" },
      { order: 1, text: "Wie häu­fig be­test du pri­vat?" },
      { order: 2, text: "Wo be­test du am häu­figs­ten?" },
      { order: 3, text: "Wie be­test du?" },
      // prettier-ignore
      { order: 4, text: "Was kommt mindestens ein­mal in der Wo­che in dei­nen Ge­be­ten vor?" },
      // prettier-ignore
      { order: 5, text: "Wie be­test du? Was kommt mindestens ein­mal in der Wo­che in dei­nen Ge­be­ten vor? Was kommt mindestens ein­mal in der Wo­che in dei­nen Ge­be­ten vor?" },
      // prettier-ignore
      { order: 6, text: "Was kommt mindestens ein­mal in der Wo­che in dei­nen Ge­be­ten vor? Was kommt mindestens ein­mal in der Wo­che in dei­nen Ge­be­ten vor?" },
      // prettier-ignore
      { order: 7, text: "Was kommt mindestens ein­mal in der Wo­che in dei­nen Ge­be­ten vor?" },
      { order: 8, text: "Wie häu­fig be­test du pri­vat?" },
      { order: 9, text: "Wo be­test du am häu­figs­ten?" },
      { order: 10, text: "Wie be­test du?" },
      // prettier-ignore
      { order: 11, text: "Was kommt mindestens ein­mal in der Wo­che in dei­nen Ge­be­ten vor?" },
      // prettier-ignore
      { order: 12, text: "Wie be­test du? Was kommt mindestens ein­mal in der Wo­che in dei­nen Ge­be­ten vor? Was kommt mindestens ein­mal in der Wo­che in dei­nen Ge­be­ten vor?" },
    ],
  } as QuestionsState,

  reducers: {
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = Math.abs(
        (state.currentIndex + action.payload) % state.questions.length
      );

      return state;
    },
  },
});

export const actions = questionsSlice.actions;

export const selectors = {
  currentIndex: createSelector(
    (state: RootState) => state.questionsState,
    questionsState => questionsState.currentIndex
  ),

  questionsLength: createSelector(
    (state: RootState) => state.questionsState,
    questionsState => questionsState.questions.length
  ),

  questions: createSelector(
    (state: RootState) => state.questionsState,
    // prettier-ignore
    questionsState => [...questionsState.questions].sort((q1, q2) => q1.order - q2.order)
  ),
};
