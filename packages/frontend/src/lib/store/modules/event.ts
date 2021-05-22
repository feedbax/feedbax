/* eslint-disable no-param-reassign */

import consola from '@feedbax/api/generic/logger';

import type { Event } from '@feedbax/api/models/event';
import type { WithImmer, ImmerAction } from '@/lib/store/types';

type LoginPacketData = import('@feedbax/api/client/packets/login').PacketData;

interface EventStoreData {
  event: Partial<Event> & {
    questionIds: string[];
  };
}

interface EventStoreActions {
  resetEvent: ImmerAction<() => void>;
  loadEvent: ImmerAction<(event: LoginPacketData) => void>;
}

declare module '@/lib/store/types' {
  interface FeedbaxStoreData extends EventStoreData {}
  interface FeedbaxStoreActions extends EventStoreActions {}
}

type EventStore = EventStoreData & EventStoreActions;

const _: any = null;
const initial: EventStoreData = {
  event: {
    id: undefined,
    slug: undefined,

    questionIds: [],
  },
};

export const createEventStore = (withImmer: WithImmer): EventStore => ({
  event: initial.event,

  resetEvent: withImmer((draft) => {
    consola.trace('FeedbaxStore', 'resetEvent');
    draft.event = initial.event;
  }),

  loadEvent: withImmer((draft, event) => {
    consola.trace('FeedbaxStore', 'loadEvent', { event });

    if (typeof draft.event !== 'undefined') {
      draft.event.id = event.id;
      draft.event.slug = event.slug;
      draft.addQuestions.withDraft(draft)(event.questions);

      const [firstQuestionId] = draft.event.questionIds;
      draft.app.currentQuestionId = firstQuestionId;
    }
  }),
});
