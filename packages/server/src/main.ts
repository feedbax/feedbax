import { createServer } from "http";
import { Server, Socket } from "@feedbax/api/server/socket";

import FBXAPI from "@feedbax/api/server/api";

const httpServer = createServer();
const io = new Server(httpServer, {});

io.on("connection", (socket: Socket) => {
  const api = FBXAPI.from({ socket });

  api.on({
    id: 'login',
    handler: (data, res) => {
      res({
        err: 'not implemented'
      });
    },
  });
});

httpServer.listen(3000);
