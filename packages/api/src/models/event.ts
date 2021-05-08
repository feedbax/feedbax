import type { Prisma } from '@feedbax/prisma';
import type { QuestionWith } from '@/models/question';

type _Event = Prisma.EventGetPayload<{
  select: {
    id: true;
    slug: true;
    meta: {
      select: {
        title: true;
        description: true;
        image: true;
      };
    };
  };
}>;

export type Event = _Event & {};

type WithProperties = 'questions' | 'answers';
type Optional = '' | '?'

type QuestionWithExtract<T> = QuestionWith<Extract<T, `answers${Optional}`>>;

export type EventWith<With extends `${WithProperties}${Optional}`> = (
  'questions' extends With
    ? Event & { questions: QuestionWithExtract<With>[] }
    : 'questions?' extends With
      ? Event & { questions?: QuestionWithExtract<With>[] }
      : Event
);