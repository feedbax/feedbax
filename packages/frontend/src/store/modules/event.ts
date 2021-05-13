/* eslint-disable no-param-reassign */

import consola from '@feedbax/api/generic/logger';

import type { Event } from '@feedbax/api/models/event';
import type { FeedbaxStore, WithImmer } from '@/store/types';

type LoginPacketData = import('@feedbax/api/client/packets/login').PacketData;

interface EventStoreData {
  event: Partial<Event> & {
    questionIds: string[];
  };
}

interface EventStoreActions {
  resetEvent: (workingDraft?: FeedbaxStore) => void;
  loadEvent: (event: LoginPacketData) => void;
}

declare module '@/store/types' {
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

  resetEvent: (workingDraft) => {
    consola.trace('FeedbaxStore', 'resetEvent', { workingDraft });

    const implementation = (draft: FeedbaxStore) => {
      draft.event = initial.event;
    };

    return typeof workingDraft === 'undefined'
      ? withImmer(implementation)
      : implementation(workingDraft);
  },

  loadEvent: (event) => withImmer((draft) => {
    consola.trace('FeedbaxStore', 'loadEvent', { event });

    if (typeof draft.event !== 'undefined') {
      draft.event.id = event.id;
      draft.event.slug = event.slug;
      draft.addQuestions(event.questions, draft);

      const [firstQuestionId] = draft.event.questionIds;
      draft.app.currentQuestionId = firstQuestionId;
    }
  }),
});
