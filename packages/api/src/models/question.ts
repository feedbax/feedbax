import type { Prisma } from '@feedbax/prisma';
import type { Answer } from '@/models/answer';

type _Question = Prisma.QuestionGetPayload<{
  select: {
    id: true;
    eventId: true;

    text: true;
    order: true;
    settings: true;
  };
}>;

export type Question = _Question & {
  likesCount: number;
  hasLiked: boolean;
};

type WithProperties = 'answers';
type Optional = '' | '?'

export type QuestionWith<With extends `${WithProperties}${Optional}`> = (
  'answers' extends With
    ? Question & { answers: Answer[] }
    : 'answers?' extends With
      ? Question & { answers?: Answer[] }
      : Question
);
