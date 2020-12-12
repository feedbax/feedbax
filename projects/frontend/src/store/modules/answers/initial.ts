import { generateAnswer } from '~store/helper/seed';
import { AnswersFilter, AnswersState } from './types';

import questionsInitialState from '~store/modules/questions/initial';

const initialState = {
  currentFilter: AnswersFilter.Recent,
  answers: (
    new Array(1000)
      .fill(0)
      .map((_, i) => generateAnswer(questionsInitialState, i))
  ),
} as AnswersState;

export default initialState;
