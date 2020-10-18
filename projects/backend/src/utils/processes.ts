import cluster from 'cluster';
import os from 'os';

export const numProcesses = os.cpus().length;

export const spawnWorkers = (): cluster.Worker[] => {
  const workers: cluster.Worker[] = [];

  const spawn = function (i: number): void {
    workers[i] = cluster.fork();

    workers[i].on('exit', () => {
      console.log('respawning worker', i);
      spawn(i);
    });
  };

  for (let i = 0; i < numProcesses; i += 1) {
    spawn(i);
  }

  return workers;
};

export const getRandomInt = (
  (min: number, max: number): number => {
    const $min = Math.ceil(min);
    const $max = Math.floor(max);
    return Math.floor(Math.random() * ($max - $min + 1)) + $min;
  }
);
