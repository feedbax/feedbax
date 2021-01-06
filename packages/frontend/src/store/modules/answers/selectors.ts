import memoize from 'lodash.memoize';

import createSelector from '~store/helper/create-selector';
import questionsSelectors from '~store/modules/questions/selectors';

import { AnswersFilter } from './types';

import type { RootState } from '~store';
import type { AnswerState } from './types';

type FilterAnswers = (
  (answers: AnswerState[], filter: AnswersFilter) => AnswerState[]
);

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

const currentFilteredAnswersSelector = (
  createSelector(
    answersSelector,
    currentFilterSelector,
    questionsSelectors.currentQuestionAnswerIds,

    (answers, currentFilter, currentQuestionAnswerIds) => (
      filterAnswers(
        currentQuestionAnswerIds
          .map((answerId) => answers[answerId])
          .sort((a, b) => b.createdDate - a.createdDate),

        currentFilter,
      )
    ),
  )
);

const currentAnswersCountSelector = (
  createSelector(
    questionsSelectors.currentQuestionAnswerIds,
    (answers) => answers.length,
  )
);

const answerByIdSelector = (
  createSelector(
    answersSelector,
    (answers) => memoize(
      (answerId: string) => (
        answers[answerId]
      ),
    ),
  )
);

const currentFilteredAnswerIdsSelector = (
  createSelector(
    currentFilteredAnswersSelector,
    (answers) => answers.map(
      (answer) => answer.id,
    ),
  )
);

const currentFilteredAnswerIdsByAmountSelector = (
  createSelector(
    currentFilteredAnswerIdsSelector,
    (answers) => memoize(
      (count: number) => (
        answers.slice(0, count)
      ),
    ),
  )
);

const selectors = {
  currentFilter: currentFilterSelector,
  currentFilteredAnswers: currentFilteredAnswersSelector,
  currentFilteredAnswerIds: currentFilteredAnswerIdsSelector,
  currentAnswersCount: currentAnswersCountSelector,
  currentFilteredAnswerIdsByAmount: currentFilteredAnswerIdsByAmountSelector,

  answerById: answerByIdSelector,
};

export default selectors;
