import EventService from '@/services/event';
import type FBXAPI from "@feedbax/api/server/api";

export default (api: FBXAPI) => api.on({
  id: 'login',
  handler: async (data, res) => {
    api.console.debug('api.on', 'login', 'handler', data.uuid, data.eventSlug);

    const { uuid, eventSlug } = data;
    const event = await EventService.getInitialBy({ userUuid: uuid, eventSlug });

    if (event === null) {
      return res({
        err: `event '${data.eventSlug}' doesn't exist`
      });
    }

    return res({ event });
  },
});
