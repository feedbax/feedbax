import type { FeedbaxStore } from '@/lib/store/types';

import { appSelectors } from '@/lib/store/modules/app';

export default {
  ...appSelectors,

  currentQuestionReactionIds: (state: FeedbaxStore) => {
    const { currentQuestionId } = state.app;
    if (typeof currentQuestionId === 'undefined') return [];

    const { [currentQuestionId]: currentQuestion } = state.questions;
    return currentQuestion.reactionIds;
  },

  currentQuestionSettings: (state: FeedbaxStore) => {
    const { currentQuestionId } = state.app;
    if (typeof currentQuestionId === 'undefined') return null;

    const { [currentQuestionId]: currentQuestion } = state.questions;
    return currentQuestion.settings;
  },

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
  isSingleQuestion: (state: FeedbaxStore) => state.event.questionIds.length === 1,

  questions: (state: FeedbaxStore) => state.questions,
  reactions: (state: FeedbaxStore) => state.reactions,

  reset: (state: FeedbaxStore) => state.reset,
  loadEvent: (state: FeedbaxStore) => state.loadEvent,
  removeReactions: (state: FeedbaxStore) => state.removeReactions,
  removeQuestions: (state: FeedbaxStore) => state.removeQuestions,
};
