import type { Prisma } from '@feedbax/prisma';

type _Answer = Prisma.AnswerGetPayload<{
  select: {
    id: true;
    questionId: true;

    text: true;
    createdAt: true;
    likesCount: true;
  };
}>;

export type Answer = _Answer & {
  hasLiked: boolean;
  isMine: boolean;
};
