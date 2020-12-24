import { createSlice } from '@reduxjs/toolkit';

import reducers from './reducers';
import seed from '~store/seed.json';

export const questionsSlice = createSlice({
  name: 'questions',
  initialState: seed.questionsState,
  reducers,
});

export const { actions } = questionsSlice;
export { default as selectors } from './selectors';

export * from './types';
