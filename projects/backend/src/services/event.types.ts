import type { feedbax } from '@feedbax/protos';
import type { EventGetPayload, FindFirstEventArgs } from '@utils/prisma';

import type { PPartial } from '@utils/types';

type TransformEventPayload = (
  EventGetPayload<{
    include: {
      questions: true;
    };
  }>
);

export type TransformEvent = (
  PPartial<TransformEventPayload, {
    questions: true;
  }>
);

export type GetBySlug = { slug: string; };
export type Include = FindFirstEventArgs['include'];

export type GetBy = {
  /* eslint-disable max-len */

  ({ slug }: GetBySlug): Promise<EventGetPayload<Record<string, unknown>>>;
  <T extends Include>({ slug }: GetBySlug, include: T): Promise<EventGetPayload<{ include: T }>>;
  <T extends Include>({ slug }: GetBySlug, include: T, uuid: string): Promise<feedbax.Model.IEvent>;

  /* eslint-enable max-len */
};
