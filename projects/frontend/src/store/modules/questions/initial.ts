import { generateQuestion } from '~store/helper/seed';
import type { QuestionsState } from './types';

const initialState: QuestionsState = {
  currentIndex: 0,
  questions: new Array(10).fill(0).map((_, i) => generateQuestion(i)),
};

export default initialState;
