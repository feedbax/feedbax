import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type QuestionState = {
  text: string
  order: number
}

export type QuestionsState = {
  currentIndex: number
  questions: Array<QuestionState>
}

export const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    currentIndex: 0,

    questions: [
      // prettier-ignore
      { order: -1, text: "Was kommt mindestens ein­mal in der Wo­che in dei­nen Ge­be­ten vor? Was kommt mindestens ein­mal in der Wo­che in dei­nen Ge­be­ten vor?" },
      { order: 0, text: "Was kommt mindestens ein­mal in der Wo­che in dei­nen Ge­be­ten vor?" },
      { order: 1, text: "Wie häu­fig be­test du pri­vat?" },
      { order: 2, text: "Wo be­test du am häu­figs­ten?" },
      { order: 3, text: "Wie be­test du?" },
      { order: 4, text: "Was kommt mindestens ein­mal in der Wo­che in dei­nen Ge­be­ten vor?" },
      { order: 5, text: "Wie be­test du? Was kommt mindestens ein­mal in der Wo­che in dei­nen Ge­be­ten vor? Was kommt mindestens ein­mal in der Wo­che in dei­nen Ge­be­ten vor?" },
    ],
  } as QuestionsState,

  reducers: {
    setCurrent: (state, action: PayloadAction<number>) => {
      state.currentIndex = Math.abs(
        (state.currentIndex + action.payload) % state.questions.length
      )

      return state
    },
  },
})

export const { setCurrent: setCurrentQuestion } = questionsSlice.actions
