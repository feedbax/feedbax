import { worker } from 'cluster';

// eslint-disable-next-line import/prefer-default-export
export const workerId = worker?.id || 'NONE';
