import { io } from '@/client/socket';

import { LogLevel } from '@/base/logger';
import FBXAPI from '@/client/api';

export const client = async () => {
  const socket = io("ws://localhost:3000", {});
  const api = FBXAPI.from({ socket, logLevel: LogLevel.Trace });

  api.send({
    id: 'login',
    data: {
      uuid: 'uuid',
      eventSlug: 'slug',
    },

    cb: (data) => {
      if (data.err) {
        api.console.error('api.send', 'login', 'callback', data.err);
        return;
      }

      api.console.debug('api.send', 'login', 'callback', data.event);
    }
  });
};
