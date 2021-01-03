import { AnswersFilter } from './types';
import type { AnswersState } from './types';

const initialState: AnswersState = ({
  currentFilter: AnswersFilter.Recent,
  answers: {},
});

export default initialState;
