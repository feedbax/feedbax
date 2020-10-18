import ioServer from 'socket.io';
import express from 'express';

import UUID from '@utils/uuid';
import { workerId } from '@utils/worker';
import handlers from '@events';

import type { Socket } from 'net';

export const replica = (
  async (): Promise<void> => {
    console.log(`[worker-${workerId}]`, 'started');

    await UUID.init();

    const serverExpress = express();
    const serverLocal = serverExpress.listen(0, 'localhost');
    const serverWs = ioServer(serverLocal);

    serverWs.on('connection', (socket) => {
      console.log(`[worker-${workerId}]`, 'handling ws-connection', socket.id);

      handlers.forEach((createHandler) => createHandler(socket));

      socket.on('disconnect', () => {
        console.log(`[worker-${workerId}]`, 'handling ws-disconnect', socket.id);
      });
    });

    process.on('message', (message, connection: Socket) => {
      if (message !== 'give-connection') return;

      console.log(`[worker-${workerId}]`, 'handling connection');
      serverLocal.emit('connection', connection);
      connection.resume();
    });
  }
);

export default replica;
