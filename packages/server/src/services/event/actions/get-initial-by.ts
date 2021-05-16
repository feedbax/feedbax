import { Prisma, PrismaClient } from '@feedbax/prisma';

import type { PacketData } from '@feedbax/api/client/packets/login';
import type { QuestionWith } from '@feedbax/api/models/question';
import type { Answer } from '@feedbax/api/models/answer';

type GetInitialByCommon<T> = T & { userUuid: string };
type GetInitialById = GetInitialByCommon<{ eventId: string }>;
type GetInitialBySlug = GetInitialByCommon<{ eventSlug: string }>;

type GetInitialByArgs =
  | GetInitialById
  | GetInitialBySlug;

type GetInitialByReturn = Promise<PacketData>;
type This = { prisma: PrismaClient };

const eventInclude = (
  Prisma.validator<Prisma.EventInclude>()({
    meta: true,
    questions: {
      include: {
        settings: true,
        answers: {
          include: {
            likes: true,
          },
        },
      },
    },
  })
);

type EventData = Prisma.EventGetPayload<{ include: typeof eventInclude }>;

export class GetInitialBy {
  private static contextualize(userUuid: string, event: EventData): PacketData {
    const result: PacketData = {} as PacketData;

    result.id = event.id;
    result.slug = event.slug;    
    result.questions = [];

    for (let i = 0; i < event.questions.length; i += 1) {
      const question = event.questions[i];
      const { id, eventId } = question;
      const { order, text } = question;
      const { answers, settings } = question;

      const resultQuestion: QuestionWith<'answers'> = {
        id,
        eventId,

        likesCount: 0,
        text,
        order,

        settings,
        answers: [],

        hasLiked: false,
      };

      for (let j = 0; j < answers.length; j += 1) {
        const answer = answers[j];
        const { id, questionId } = answer;
        const { author, text } = answer;
        const { likes } = answer;
        const { createdAt } = answer;

        const resultAnswer: Answer = {
          id,
          questionId,

          text,
          createdAt,
          likesCount: 0,

          hasLiked: false,
          isMine: author === userUuid,
        };

        for (let k = 0; k < likes.length; k += 1) {
          const like = likes[k];

          resultQuestion.hasLiked ||= like.author === userUuid
          resultAnswer.hasLiked ||= like.author === userUuid;

          resultAnswer.likesCount++;
          resultQuestion.likesCount++;
        }

        resultQuestion.answers.push(resultAnswer);
      }

      result.questions.push(resultQuestion);
    }

    return result;
  }

  // public static async _getInitialBy(this: This, props: GetInitialById): GetInitialByReturn;
  public static async action(this: This, props: GetInitialBySlug): GetInitialByReturn;
  public static async action(this: This, props: GetInitialByArgs): GetInitialByReturn {
    const { userUuid } = props;

    if ('eventSlug' in props) {
      const { eventSlug: slug } = props;
      const event = await this.prisma.event.findUnique({
        where: { slug },
        rejectOnNotFound: true,
        include: eventInclude,
      });

      return GetInitialBy.contextualize(userUuid, event);
    }

    throw new Error(`getInitialBy '${Object.keys(props)}' is not implemented yet.`);
  }
}
