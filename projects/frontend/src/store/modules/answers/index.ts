import { createSlice } from '@reduxjs/toolkit';

import reducers from './reducers';
import seed from '~store/seed.json';

export const answersSlice = createSlice({
  name: 'answer',
  initialState: seed.answersState,
  reducers,
});

export const { actions } = answersSlice;
export { default as selectors } from './selectors';

export * from './types';
