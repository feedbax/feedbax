import type { QuestionGetPayload } from '@utils/prisma';
import type { PPartial } from '@utils/types';

type TransformQuestionPayload = (
  QuestionGetPayload<{
    include: {
      answers: {
        include: {
          likes: true;
        };
      };
    };
  }>
);

export type TransformQuestion = (
  PPartial<TransformQuestionPayload, {
    answers: {
      likes: true;
    };
  }>
);
