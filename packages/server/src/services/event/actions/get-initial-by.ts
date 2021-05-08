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

    result.meta  = event.meta
      ? {
        title: event.meta.title,
        description: event.meta.description,
        image: event.meta.image,
      }
      : null;


    for (let i = 0; i < event.questions.length; i += 1) {
      const question = event.questions[i];
      const { id, likesCount, text } = question;
      const { likesDisplayMode, answersMode } = question;
      const { answers } = question;

      const resultQuestion: QuestionWith<'answers'> = {
        id, likesCount, text,
        likesDisplayMode,
        answersMode,
        answers: [],
        hasLiked: false,
      };

      for (let j = 0; j < answers.length; j += 1) {
        const answer = answers[j];
        const { id, author, text } = answer;
        const { likes, likesCount } = answer;
        const { createdAt } = answer;

        const resultAnswer: Answer = {
          id, text, createdAt,
          likesCount,

          hasLiked: false,
          isMine: author === userUuid,
        };

        for (let k = 0; k < likes.length; k += 1) {
          const like = likes[k];

          resultQuestion.hasLiked ||= like.author === userUuid
          resultAnswer.hasLiked ||= like.author === userUuid;
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
