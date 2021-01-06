import type { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import type { feedbax } from '@feedbax/api';
import type { DeepRequired, Merge } from 'ts-essentials';

/* eslint-disable @typescript-eslint/indent */
export type EventModel = (
  Merge<
    DeepRequired<feedbax.Model.IEvent>,
    Pick<feedbax.Model.IEvent, 'settings'>
  >
);

export type EventState = (
  Merge<
    EventModel,
    { questions: string[] }
  >
);
/* eslint-enable @typescript-eslint/indent */

export type EventsState = {
  event: EventState | Record<string, never>;
};

export type Reducer<T> = CaseReducer<EventsState, PayloadAction<T>>;
