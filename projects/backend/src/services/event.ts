import { prisma } from '@utils/prisma';
import { feedbax } from '@feedbax/protos';

import QuestionService from '@services/question';

import type { JsonObject, JsonValue } from '@utils/prisma';
import type { GetBy, Include, TransformEvent } from './event.types';

export function validSettings(value: JsonValue): value is JsonObject {
  if (value === null) return false;
  if (typeof value !== 'object') return false;
  if (Array.isArray(value)) return false;

  return true;
}

export default class EventService {
  static transform = (
    (event: TransformEvent, uuid: string): feedbax.Model.Event => {
      const questions = event.questions ?? [];

      const EventModel = feedbax.Model.Event;
      const eventProto = EventModel.create({
        slug: event.slug,
        settings: validSettings(event.settings) ? event.settings : {},
        startDate: event.startDate.getTime() / 1000,
        durationInDays: event.durationInDays,

        questions: questions.map(
          (question) => QuestionService.transform(question, uuid),
        ),
      });

      return eventProto;
    }
  );

  public static getBy: GetBy = (
    // eslint-disable-next-line max-len
    async (props: any, include?: Include, uuid?: string): Promise<any> => {
      if (props.slug) {
        const event = (
          await prisma.event
            .findOne({
              where: {
                slug: props.slug,
              },

              include,
            })
        );

        if (event === null) {
          throw new Error('Event.getBy - event not found');
        }

        if (uuid) {
          return EventService.transform(event, uuid);
        }

        return event;
      }

      throw new Error('Event.getBy - wrong usage');
    }
  );
}
