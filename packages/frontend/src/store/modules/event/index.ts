import { createSlice } from '@reduxjs/toolkit';

import reducers from './reducers';
import seed from '~store/seed.json';

import type { EventsState } from './types';

export const eventsSlice = createSlice({
  name: 'events',
  initialState: seed.eventsState as EventsState,
  reducers,
});

export const { actions } = eventsSlice;
export { default as selectors } from './selectors';

export * from './types';
