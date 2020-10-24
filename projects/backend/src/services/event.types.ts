import type { feedbax } from '@feedbax/protos';
import type { EventGetPayload } from '@utils/prisma';

/* eslint-disable max-len, quote-props */
export const includes = {
  'event': null,
  'event.questions': { questions: true },
  'event.questions.answers': { questions: { include: { answers: true } } },
  'event.questions.answers.likes': { questions: { include: { answers: { include: { likes: true } } } } },
};
/* eslint-enable max-len, quote-props */

export type Include = keyof typeof includes;
export type Payload<T extends Include> = (
  T extends Include
  ? EventGetPayload<{ include: typeof includes[T] }>
  : EventGetPayload<{ include: null }>
);

export type GetBySlug = { slug: string; };

export type GetBy = {
  /* eslint-disable max-len */
  ({ slug }: GetBySlug): Promise<Payload<'event'>>;
  <T extends Include>({ slug }: GetBySlug, include?: T): Promise<Payload<T>>;
  /* eslint-enable max-len */
};

export type GetProtoBy = {
  /* eslint-disable max-len */
  ({ slug }: GetBySlug, uuid: string, include?: Include): Promise<feedbax.Model.IEvent>;
  /* eslint-enable max-len */
};
