import { createSlice } from '@reduxjs/toolkit';

import initialState from './initial';
import reducers from './reducers';

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers,
});

export const { actions } = questionsSlice;
export { default as selectors } from './selectors';

export * from './types';
