import type { Prisma } from '@feedbax/prisma';

type _Answer = Prisma.AnswerGetPayload<{
  select: {
    id: true;
    questionId: true;

    text: true;
    createdAt: true;
  };
}>;

export type Answer = _Answer & {
  likesCount: number;
  hasLiked: boolean;
  isMine: boolean;
};
