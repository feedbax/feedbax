import memoize from 'lodash.memoize';

import createSelector from '~store/helper/create-selector';
import { selectors as questionsSelectors } from '~store/modules/questions';

import { AnswersFilter } from './types';

import type { RootState } from '~store';
import type { AnswerState } from './types';

const currentFilterSelector = (
  (state: RootState): AnswersFilter => (
    state.answersState.currentFilter
  )
);

const answersSelector = (
  (state: RootState) => (
    state.answersState.answers
  )
);

const answersMapSelector = (
  (state: RootState) => {
    const { answers } = state.answersState;
    const answersMap = new Map<string, AnswerState>();

    for (let i = 0; i < answers.length; i += 1) {
      const answer = answers[i];
      answersMap.set(answer.id, answer);
    }

    return answersMap;
  }
);

type FilterAnswers = (answers: AnswerState[], filter: AnswersFilter) => AnswerState[];

const filterAnswers: FilterAnswers = (
  (answers, filter) => {
    switch (filter) {
      default:
      case AnswersFilter.Recent: {
        return answers;
      }

      case AnswersFilter.Mine: {
        return answers.filter((a) => a.isMine);
      }

      case AnswersFilter.Liked: {
        return answers.sort((a, b) => b.likesCount - a.likesCount);
      }
    }
  }
);

const currentAnswersSelector = (
  createSelector(
    answersSelector,
    currentFilterSelector,
    questionsSelectors.currentQuestionId,

    (answers, currentFilter, currentQuestionId) => (
      filterAnswers(
        answers
          .filter((a) => a.questionId === currentQuestionId)
          .sort((a, b) => b.createdDate - a.createdDate),

        currentFilter,
      )
    ),
  )
);

const currentAnswersIdsSelector = (
  createSelector(
    currentAnswersSelector,
    (answers) => answers.map((a) => a.id),
  )
);

const answerByIdSelector = (
  createSelector(
    answersMapSelector,
    (answersMap) => memoize(
      (answerId: string) => (
        answersMap.get(answerId)
      ),
    ),
  )
);

const getCurrentAnswersIdsSelector = (
  createSelector(
    currentAnswersIdsSelector,
    (answers) => memoize(
      (count: number) => (
        answers.slice(0, count)
      ),
    ),
  )
);

const selectors = {
  currentFilter: currentFilterSelector,
  currentAnswers: currentAnswersSelector,
  currentAnswersIds: currentAnswersIdsSelector,
  answerById: answerByIdSelector,
  getCurrentAnswersIds: getCurrentAnswersIdsSelector,
};

export default selectors;
