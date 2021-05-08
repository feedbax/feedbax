import type { Prisma } from '@feedbax/prisma';
import type { Answer } from '@/models/answer';

type _Question = Prisma.QuestionGetPayload<{
  select: {
    id: true;
    text: true;
    answersMode: true;
    likesDisplayMode: true;
    likesCount: true;
  };
}>;

export type Question = _Question & {
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
