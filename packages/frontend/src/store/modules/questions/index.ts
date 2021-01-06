import { createSlice } from '@reduxjs/toolkit';

import reducers from './reducers';
import seed from '~store/seed.json';

import type { QuestionsState } from './types';

export const questionsSlice = createSlice({
  name: 'questions',
  initialState: seed.questionsState as QuestionsState,
  reducers,
});

export const { actions } = questionsSlice;
export { default as selectors } from './selectors';

export * from './types';
