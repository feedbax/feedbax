import type { UserGetPayload } from '@utils/prisma';

/* eslint-disable max-len, quote-props */
export const includes = {
  'user': null,
  'user.events': { events: true },
  'user.events.questions': { events: { include: { questions: true } } },
  'user.events.questions.answers': { events: { include: { questions: { include: { answers: true } } } } },
  'user.events.questions.answers.likes': { events: { include: { questions: { include: { answers: { include: { likes: true } } } } } } },
};
/* eslint-enable max-len, quote-props */

export type Include = keyof typeof includes;
export type Payload<T extends Include> = (
  T extends Include
  ? UserGetPayload<{ include: typeof includes[T] }>
  : UserGetPayload<{ include: null }>
);

export type GetByEmail = { email: string; };
export type GetByEmailPassword = { email: string; password: string; };

export type GetBy = {
  /* eslint-disable max-len */

  ({ email, password }: GetByEmailPassword): Promise<Payload<'user'>>;
  <T extends Include>({ email, password }: GetByEmailPassword, include?: T): Promise<Payload<T>>;

  ({ email }: GetByEmail): Promise<Payload<'user'>>;
  <T extends Include>({ email }: GetByEmail, include?: T): Promise<Payload<T>>;

  /* eslint-enable max-len */
};
