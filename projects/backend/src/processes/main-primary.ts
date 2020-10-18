import http from 'http';

import {
  spawnWorkers,
  getRandomInt,
  numProcesses,
} from '@utils/processes';

const port = process.env.PORT || 3000;

export const primary = (
  async (): Promise<void> => {
    const workers = spawnWorkers();
    const serverHttp = http.createServer();

    serverHttp.on('connection', (
      (connection) => {
        connection.pause();

        if (connection.remoteAddress) {
          const $workerIndex = getRandomInt(0, numProcesses - 1);
          const $worker = workers[$workerIndex];

          $worker.send('give-connection', connection);
        }
      }
    ));

    serverHttp.listen(port, () => {
      console.log(`Server listening at *:${port}`);
    });
  }
);

export default primary;
