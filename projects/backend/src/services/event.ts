import { prisma } from '@utils/prisma';
import { feedbax } from '@feedbax/protos';
import { GetProtoBy, includes, Payload } from './event.types';

import QuestionService from '@services/question';

import type { JsonObject, JsonValue } from '@utils/prisma';
import type { GetBy, Include } from './event.types';

export function validSettings(value: JsonValue): value is Required<JsonObject> {
  if (value === null) return false;
  if (typeof value !== 'object') return false;
  if (Array.isArray(value)) return false;

  return true;
}

type EventModel = feedbax.Model.Event;
const EventModel = feedbax.Model.Event;

export default class EventService {
  public static transform = (
    (event: Payload<Include>, uuid: string): EventModel => {
      const questions = 'questions' in event ? event.questions : [];

      const eventProto = EventModel.create({
        slug: event.slug,
        settings: validSettings(event.settings) ? event.settings : null,
        startDate: event.startDate.getTime() / 1000,
        durationInDays: event.durationInDays,

        questions: questions.map(
          (question) => QuestionService.transform(question, uuid),
        ),
      });

      return eventProto;
    }
  );

  public static getProtoBy: GetProtoBy = (
    async (props: any, uuid: string, include: Include = 'event'): Promise<any> => {
      const event = await EventService.getBy(props, include);
      return EventService.transform(event, uuid);
    }
  );

  public static getBy: GetBy = (
    async (props: any, include: Include = 'event'): Promise<any> => {
      if (props.slug) {
        const event = (
          await prisma.event
            .findOne({
              where: {
                slug: props.slug,
              },

              include: includes[include],
            })
        );

        if (event === null) {
          throw new Error('EventService.getBy - event not found');
        }

        return event;
      }

      throw new Error('EventService.getBy - wrong usage');
    }
  );
}
