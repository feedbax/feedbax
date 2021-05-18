import type { Prisma } from '@feedbax/prisma';
import type { Reaction } from '@/models/reaction';

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

type WithProperties = 'reactions';
type Optional = '' | '?'

export type QuestionWith<With extends `${WithProperties}${Optional}`> = (
  'reactions' extends With
    ? Question & { reactions: Reaction[] }
    : 'reactions?' extends With
      ? Question & { reactions?: Reaction[] }
      : Question
);
