import ioServer from 'socket.io';
import http from 'http';
import express from 'express';

import UUID from '@utils/uuid';
import handlers from '@events';
import { workerId } from '@utils/worker';

const single = (
  async (): Promise<void> => {
    await UUID.init();

    console.log(`[worker-${workerId}]`, 'started');

    const serverExpress = express();
    const serverHttp = http.createServer(serverExpress);
    const serverWs = ioServer(serverHttp);

    serverWs.on('connection', (socket) => {
      console.log(`[worker-${workerId}]`, 'handling ws-connection', socket.id);

      handlers.forEach((createHandler) => createHandler(socket));

      socket.on('disconnect', () => {
        console.log(`[worker-${workerId}]`, 'handling ws-disconnect', socket.id);
      });
    });

    serverHttp.listen(0, '127.0.0.1', () => {
      const address = serverHttp.address();
      const message = JSON.stringify(address);

      console.log(`[worker-${workerId}]`, 'listening @', message);

      if (process && process.send) {
        process.send(message);
      }
    });
  }
);

process.on('message', () => {
  single();
});
