import memoize from 'lodash.memoize';
import createSelector from '~store/helper/create-selector';

import type { RootState } from '~store';
import type { QuestionState } from './types';

const questionsSelector = (
  (state: RootState): QuestionState[] => (
    state.questionsState.questions
  )
);

const questionsOrderedSelector = (
  createSelector(
    questionsSelector,
    (questions) => (
      [...questions]
        .sort((q1, q2) => q1.order - q2.order)
    ),
  )
);

const questionsIdsSelector = (
  createSelector(
    questionsSelector,
    (questions) => questions.map((q) => q.id),
  )
);

const questionsLengthSelector = (
  (state: RootState): number => (
    state.questionsState.questions.length
  )
);

const currentIndexSelector = (
  (state: RootState): number => (
    state.questionsState.currentIndex
  )
);

const currentQuestionSelector = (
  createSelector(
    currentIndexSelector,
    questionsSelector,
    (index, questions) => questions[index],
  )
);

const currentQuestionIdSelector = (
  createSelector(
    currentIndexSelector,
    questionsSelector,
    (index, questions) => questions[index].id,
  )
);

const questionsMapSelector = (state: RootState) => {
  const { questions } = state.questionsState;
  const questionsMap = new Map<string, QuestionState>();

  for (let i = 0; i < questions.length; i += 1) {
    const question = questions[i];
    questionsMap.set(question.id, question);
  }

  return questionsMap;
};

const questionByIdSelector = (
  createSelector(
    questionsMapSelector,
    (questions) => memoize(
      (questionId: string) => (
        questions.get(questionId)
      ),
    ),
  )
);

const selectors = {
  currentIndex: currentIndexSelector,
  currentQuestion: currentQuestionSelector,
  currentQuestionId: currentQuestionIdSelector,
  questionsLength: questionsLengthSelector,
  questions: questionsSelector,
  questionsOrdered: questionsOrderedSelector,
  questionsIds: questionsIdsSelector,
  questionById: questionByIdSelector,
};

export default selectors;
