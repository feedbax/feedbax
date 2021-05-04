import { createServer } from "http";
import { Server, Socket } from "@feedbax/api/server/socket";

import FBXAPI from "@feedbax/api/server/api";

const httpServer = createServer();
const io = new Server(httpServer, {});

io.on("connection", (socket: Socket) => {
  const api = FBXAPI.from({ socket });

  api.on('login', (data, res) => {
    console.log(data.uuid, data.eventSlug);

    res({
      err: new Error('lol'),
    });
  });
});

httpServer.listen(3000);
