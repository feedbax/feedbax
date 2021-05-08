import { createServer } from "http";

import { Server, Socket } from "@feedbax/api/server/socket";
import FBXAPI, { parser, logger } from "@feedbax/api/server/api";

import EventService from '@/services/event';

const httpServer = createServer();
const io = new Server(httpServer, {
  parser,
  cors: {
    origin: '*',
  }
});

io.on("connection", async (socket: Socket) => {
  const api = FBXAPI.from({ socket, logLevel: logger.LogLevel.Trace });

  api.on({
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
});

httpServer.listen(4000);
