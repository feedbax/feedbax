import { createServer } from "http";

import { Server, Socket } from "@feedbax/api/server/socket";
import FBXAPI, { parser, logger } from "@feedbax/api/server/api";

import packetHandlers from '@/handler';

const httpServer = createServer();
const io = new Server(httpServer, {
  parser,
  cors: {
    origin: '*',
  }
});

io.on("connection", async (socket: Socket) => {
  const api = FBXAPI.from({ socket, logLevel: logger.LogLevel.Trace });
  const handlers = await Promise.all(packetHandlers);

  for (let i = 0; i < handlers.length; i++) {
    const handler = handlers[i];
    handler.default(api);
  }
});

httpServer.listen(4000);
