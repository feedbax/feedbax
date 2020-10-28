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
