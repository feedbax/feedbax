import { createServer } from "http";
import { Server, Socket } from "@/server/socket";

import { LogLevel } from '@/generic/logger';
import FBXAPI from '@/server/api';

const httpServer = createServer();
const ioServer = new Server(httpServer, {});

export const server = async () => {
  ioServer.on("connection", (socket: Socket) => {
    const api = FBXAPI.from({ socket, logLevel: LogLevel.Trace });

    api.on({
      id: 'login',
      handler: (data, res) => {
        api.console.debug('api.on', 'login', 'handler', data.uuid, data.eventSlug);

        return res({
          err: 'test-err-lol',
        });
      },
    });
  });

  httpServer.listen(3000);  
};
