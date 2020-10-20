import type { AnswerGetPayload } from '@utils/prisma';
import type { PPartial } from '@utils/types';

type TransformAnswerPayload = (
  AnswerGetPayload<{
    include: {
      likes: true;
    };
  }>
);

export type TransformAnswer = (
  PPartial<TransformAnswerPayload, {
    likes: true;
  }>
);
