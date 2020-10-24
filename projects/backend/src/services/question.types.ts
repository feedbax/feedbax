import type { QuestionGetPayload } from '@utils/prisma';

/* eslint-disable max-len, quote-props */
export const includes = {
  'questions': null,
  'questions.answers': { answers: true },
  'questions.answers.likes': { answers: { include: { likes: true } } },
};
/* eslint-enable max-len, quote-props */

export type Include = keyof typeof includes;
export type Payload<T extends Include> = (
  T extends Include
  ? QuestionGetPayload<{ include: typeof includes[T] }>
  : QuestionGetPayload<{ include: null }>
);
