import { feedbax } from '@feedbax/protos';
import { createHasLikedReducer } from '@utils/services';

import type { Like } from '@utils/prisma';
import type { TransformAnswer } from './answer.types';

const checkHasLiked = (
  (likes: Like[], uuid: string): boolean => {
    const hasLikedReducer = createHasLikedReducer(uuid);
    const hasLiked = [...likes].reduce(hasLikedReducer, false);

    return hasLiked;
  }
);

export default class AnswerService {
  static transform = (
    (answer: TransformAnswer, uuid: string): feedbax.Model.Answer => {
      const likes = answer.likes ?? [];

      const AnswerModel = feedbax.Model.Answer;
      const Answer = AnswerModel.create({
        id: answer.id,
        createdDate: answer.created.getTime() / 1000,
        likesCount: answer.likes?.length ?? 0,
        text: answer.text,

        isMine: answer.author === uuid,
        hasLiked: checkHasLiked(likes, uuid),
      });

      return Answer;
    }
  );
}
