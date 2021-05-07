import { Prisma, PrismaClient } from '@feedbax/prisma';
import type { Event, Question, Answer } from '@feedbax/prisma';

type _Event = Omit<Event, 'userId'> & {
  questions: Array<_Question>;
};

type _Question = Omit<Question, 'eventId'> & {
  hasLiked: boolean;
  answers: Array<_Answer>;
};

type _Answer = Omit<Answer, 'questionId' | 'author'> & {
  isMine: boolean;
  hasLiked: boolean;
};

type GetInitialByCommon<T> = T & { userUuid: string };
type GetInitialById = GetInitialByCommon<{ eventId: string }>;
type GetInitialBySlug = GetInitialByCommon<{ eventSlug: string }>;

type GetInitialByResult = _Event;
type GetInitialByReturn = Promise<GetInitialByResult>;

type GetInitialBy =
  | GetInitialById
  | GetInitialBySlug;

export default class EventService {
  private static prisma = new PrismaClient();

  // public static async getInitialBy(props: GetInitialById): GetInitialByReturn;
  public static async getInitialBy(props: GetInitialBySlug): GetInitialByReturn;
  public static async getInitialBy(props: GetInitialBy): GetInitialByReturn {
    const { userUuid } = props;

    const eventArgs = Prisma.validator<Prisma.EventArgs>()({
      include: {
        questions: {
          include: {
            answers: {
              include: {
                likes: true,
              },
            },
          },
        },
      }
    });

    type EventAll = Prisma.EventGetPayload<typeof eventArgs>;
    const transformer = (event: EventAll): GetInitialByResult => {
      const result: GetInitialByResult = {} as GetInitialByResult;

      result.id = event.id;
      result.slug = event.slug;
      result.questions = [];

      for (let i = 0; i < event.questions.length; i += 1) {
        const question = event.questions[i];
        const { id, likesCount, text } = question;
        const { likesDisplayMode, answersMode } = question;
        const { answers } = question;

        const resultQuestion: _Question = {
          id, likesCount, text,
          likesDisplayMode,
          answersMode,
          answers: [],
          hasLiked: false,
        };

        for (let j = 0; j < answers.length; j += 1) {
          const answer = answers[j];
          const { id, author, text  } = answer;
          const { likes, likesCount } = answer;
          const { createdAt } = answer;

          const resultAnswer: _Answer = {
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
    };

    if ('eventSlug' in props) {
      const { eventSlug: slug } = props;
      const event = await EventService.prisma.event.findUnique({
        where: { slug },
        rejectOnNotFound: true,

        ...eventArgs,
      });

      return transformer(event);
    }

    throw new Error(`getInitialBy '${Object.keys(props)}' is not implemented yet.`);
  }

  private static contextualize(event: Event) {

  }
}
