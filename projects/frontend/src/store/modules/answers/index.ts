import { createSlice } from '@reduxjs/toolkit';

import initialState from './initial';
import reducers from './reducers';

export const answersSlice = createSlice({
  name: 'answer',
  initialState,
  reducers,
});

export const { actions } = answersSlice;
export { default as selectors } from './selectors';

export * from './types';
