import memoize from 'lodash.memoize';

import createSelector from '~store/helper/create-selector';
import eventSelectors from '~store/modules/event/selectors';

import type { RootState } from '~store';

const allQuestionsSelector = (
  (state: RootState) => (
    state.questionsState.questions
  )
);

const currentIndexSelector = (
  (state: RootState): number => (
    state.questionsState.currentIndex
  )
);

const questionsSelector = (
  createSelector(
    allQuestionsSelector,
    eventSelectors.eventQuestionIds,
    (questions, questionIds) => questionIds.map(
      (questionId) => questions[questionId],
    ),
  )
);

const questionsOrderedSelector = (
  createSelector(
    questionsSelector,
    (questions) => questions.sort(
      (q1, q2) => q1.order - q2.order,
    ),
  )
);

const questionsLengthSelector = (
  createSelector(
    eventSelectors.eventQuestionIds,
    (questionIds) => questionIds.length,
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
    currentQuestionSelector,
    (question) => question.id,
  )
);

const currentQuestionAnswerIdsSelector = (
  createSelector(
    currentQuestionSelector,
    (question) => question.answers,
  )
);

const questionByIdSelector = (
  createSelector(
    allQuestionsSelector,

    (questions) => memoize(
      (questionId: string) => (
        questions[questionId]
      ),
    ),
  )
);

const selectors = {
  currentIndex: currentIndexSelector,
  currentQuestion: currentQuestionSelector,
  currentQuestionId: currentQuestionIdSelector,
  currentQuestionAnswerIds: currentQuestionAnswerIdsSelector,
  questionsLength: questionsLengthSelector,
  questions: questionsSelector,
  questionsOrdered: questionsOrderedSelector,
  questionsIds: eventSelectors.eventQuestionIds,
  questionById: questionByIdSelector,
};

export default selectors;
