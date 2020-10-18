import { prisma } from '@utils/prisma';

import type { GetBy } from './event.types';

export default class EventService {
  public static getBy: GetBy = (
    // eslint-disable-next-line max-len
    async (props: any, include?: any): Promise<any> => {
      if (props.slug) {
        const event = (
          await prisma.event.findOne({
            where: {
              slug: props.slug,
            },

            include,
          })
        );

        if (event === null) {
          throw new Error('Event.getBy - event not found');
        }

        return event;
      }

      throw new Error('Event.getBy - wrong usage');
    }
  );
}
