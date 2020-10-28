import QuestionService from '@services/question';

import { prisma } from '@utils/prisma';
import { feedbax } from '@feedbax/protos';
import { includes } from './types';

import type { Event, JsonObject, JsonValue } from '@utils/prisma';

import type { GetBy, GetByProps } from './types';
import type { GetBySlug, GetBySlugProps } from './types';
import type { GetProtoBy } from './types';
import type { Include } from './types';
import type { Transform } from './types';
import type { CreateInput } from './types';

export function validSettings(value: JsonValue): value is Required<JsonObject> {
  if (value === null) return false;
  if (typeof value !== 'object') return false;
  if (Array.isArray(value)) return false;

  return true;
}

type EventModel = feedbax.Model.Event;
const EventModel = feedbax.Model.Event;

export default class EventService {
  public static createInput: CreateInput = (
    (props) => ({
      slug: props.slug,
      startDate: props.startDate,
      durationInDays: props.durationInDays,
      settings: props.settings,
      questions: undefined,
    })
  );

  public static transform: Transform = (
    (event, uuid) => {
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
    async (props: GetByProps, uuid: string, include: Include = 'event'): Promise<any> => {
      const event = await EventService.getBy(props, include);
      return EventService.transform(event, uuid);
    }
  );

  public static getBy: GetBy = (
    async (props: GetByProps, include: Include = 'event'): Promise<Event> => {
      if ('slug' in props) {
        return EventService.getBySlug(props, include);
      }

      throw new Error('EventService.getBy - wrong usage');
    }
  );

  private static getBySlug: GetBySlug = (
    async (props: GetBySlugProps, include: Include = 'event'): Promise<Event> => {
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
        throw new Error('EventService.getBySlug - event not found');
      }

      return event;
    }
  );
}
