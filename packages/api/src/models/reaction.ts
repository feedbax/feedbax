import type { Prisma } from '@feedbax/prisma';

type _Reaction = Prisma.ReactionGetPayload<{
  select: {
    id: true;
    questionId: true;

    text: true;
    createdAt: true;
  };
}>;

export type Reaction = _Reaction & {
  likesCount: number;
  hasLiked: boolean;
  isMine: boolean;
};
