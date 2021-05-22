/* eslint-disable no-param-reassign */

import consola from '@feedbax/api/generic/logger';

import type { Event } from '@feedbax/api/models/event';
import type { CreateStore, CreateSelectors, Selector } from '@/lib/store/types';
import type { WithImmer, ImmerAction } from '@/lib/store/types';

type LoginPacketData = import('@feedbax/api/client/packets/login').PacketData;

type EventStoreData = Partial<Event> & {
  questionIds: string[];
};

type EventStoreActions = {
  reset: ImmerAction<() => void>;
  load: ImmerAction<(event: LoginPacketData) => void>;
};

type EventStoreSelectors = {
  get: Selector<EventStoreData>,
  questionIds: Selector<EventStoreData['questionIds']>,
  isSingleQuestion: Selector<boolean>,

  load: Selector<EventStoreActions['load']>,
};

type ModuleName = 'event';

type EventStore =
  CreateStore<ModuleName, EventStoreData, EventStoreActions>;

type EventSelectors =
  CreateSelectors<ModuleName, EventStoreSelectors>;

declare module '@/lib/store/types' {
  interface FeedbaxStore extends EventStore {}
}

const initial: EventStoreData = {
  id: undefined,
  slug: undefined,

  questionIds: [],
};

export const createEventStore = (
  (withImmer: WithImmer): EventStore => ({
    event: {
      state: initial,
      actions: {
        reset: withImmer((draft) => {
          consola.trace('FeedbaxStore', 'resetEvent');
          draft.event.state = initial;
        }),

        load: withImmer((draft, event) => {
          consola.trace('FeedbaxStore', 'loadEvent', { event });

          if (typeof draft.event !== 'undefined') {
            draft.event.state.id = event.id;
            draft.event.state.slug = event.slug;
            draft.questions.actions.addMultiple.withDraft(draft)(event.questions);

            const [firstQuestionId] = draft.event.state.questionIds;
            draft.navigation.state.questionId = firstQuestionId;
          }
        }),
      },
    },
  })
);

export const selectors: EventSelectors = {
  event: {
    get: (store) => store.event.state,
    questionIds: (store) => store.event.state.questionIds,
    isSingleQuestion: (store) => store.event.state.questionIds.length === 1,

    load: (store) => store.event.actions.load,
  },
};
