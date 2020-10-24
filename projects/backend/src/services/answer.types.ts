import type { AnswerGetPayload } from '@utils/prisma';

/* eslint-disable max-len, quote-props */
export const includes = {
  'answers': null,
  'answers.likes': { likes: true },
};
/* eslint-enable max-len, quote-props */

export type Include = keyof typeof includes;
export type Payload<T extends Include> = (
  T extends Include
  ? AnswerGetPayload<{ include: typeof includes[T] }>
  : AnswerGetPayload<{ include: null }>
);
