import type { FeedbaxStore } from '@/store/types';

export default {
  currentQuestionId: (state: FeedbaxStore) => state.app.currentQuestionId,
  currentQuestionNumber: (state: FeedbaxStore) => `${state.app.currentQuestionIndex + 1}`.padStart(2, '0'),

  isFirstQuestion: (state: FeedbaxStore) => {
    const { currentQuestionIndex } = state.app;
    return currentQuestionIndex === 0;
  },

  isLastQuestion: (state: FeedbaxStore) => {
    const { currentQuestionIndex } = state.app;
    const { questionIds } = state.event;

    return currentQuestionIndex === questionIds.length - 1;
  },

  nextQuestion: (state: FeedbaxStore) => state.nextQuestion,
  previousQuestion: (state: FeedbaxStore) => state.previousQuestion,

  event: (state: FeedbaxStore) => state.event,
  questionIds: (state: FeedbaxStore) => state.event.questionIds,
  questionsCount: (state: FeedbaxStore) => state.event.questionIds.length,

  questions: (state: FeedbaxStore) => state.questions,
  answers: (state: FeedbaxStore) => state.answers,

  reset: (state: FeedbaxStore) => state.reset,
  loadEvent: (state: FeedbaxStore) => state.loadEvent,
  removeAnswers: (state: FeedbaxStore) => state.removeAnswers,
  removeQuestions: (state: FeedbaxStore) => state.removeQuestions,
};
