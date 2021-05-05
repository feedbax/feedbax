import { createServer } from "http";
import { Server, Socket } from "@feedbax/api/server/socket";
import FBXAPI, { parser, logger } from "@feedbax/api/server/api";

const httpServer = createServer();
const io = new Server(httpServer, {
  parser,
  cors: {
    origin: '*',
  }
});

io.on("connection", (socket: Socket) => {
  const api = FBXAPI.from({ socket, logLevel: logger.LogLevel.Trace });

  api.on({
    id: 'login',
    handler: (data, res) => {
      api.console.debug('api.on', 'login', 'handler', data.uuid, data.eventSlug);

      res({
        err: 'not implemented'
      });
    },
  });
});

httpServer.listen(4000);
