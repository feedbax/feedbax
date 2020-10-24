import { feedbax } from '@feedbax/protos';
import { createHasLikedReducer, getLikesReducer } from '@utils/services';
import { QuestionType } from '@utils/prisma';

import AnswerService from '@services/answer';

import type { Include, Payload } from './question.types';
import type { Like } from '@utils/prisma';

const getQuestionType = (
  (type: QuestionType): feedbax.Model.Question.Type => {
    switch (type) {
      case QuestionType.POLL: {
        return feedbax.Model.Question.Type.POLL;
      }

      case QuestionType.VOTE: {
        return feedbax.Model.Question.Type.VOTE;
      }

      case QuestionType.NONE:
      default: {
        return feedbax.Model.Question.Type.NONE;
      }
    }
  }
);

const checkHasLiked = (
  (likes: Like[], uuid: string): boolean => {
    const hasLikedReducer = createHasLikedReducer(uuid);
    const hasLiked = [...likes].reduce(hasLikedReducer, false);

    return hasLiked;
  }
);

export default class QuestionService {
  static transform = (
    (question: Payload<Include>, uuid: string): feedbax.Model.Question => {
      const answers = 'answers' in question ? question.answers : [];
      const allLikes = answers.reduce(getLikesReducer, []);

      const QuestionModel = feedbax.Model.Question;
      const questionProto = QuestionModel.create({
        id: question.id,
        order: question.order,
        type: getQuestionType(question.type),
        text: question.text,

        likesCount: allLikes.length,
        hasLiked: checkHasLiked(allLikes, uuid),

        answers: answers.map(
          (answer) => AnswerService.transform(answer, uuid),
        ),
      });

      return questionProto;
    }
  );
}
