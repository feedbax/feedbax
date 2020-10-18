import { sh } from 'tasksfile';
import { log } from '../lib/utils';

import { build, install } from './index';

import type { ISyncShellOptions } from '@pawelgalazka/shell';

const _options: ISyncShellOptions = {
  cwd: 'projects/backend',
  async: false,
  nopipe: true,
};

const _sh = (
  (cmd: string) => {
    sh(cmd, _options);
  }
);

export const backend = {
  install: () => {
    log('[install:backend] started');

    install.protos();
    build.protos();

    _sh('yarn install');

    log('[install:backend] finished');
  },

  build: () => {
    log('[build:backend] started');

    build.protos();
  
    _sh(`npx prisma generate`);
    _sh(`rm -rf dist`);
    _sh(`npx ttsc -p tsconfig.build.json`);
    _sh(`cp package.json dist/package.json`);

    log('[build:backend] finished');
  },
};
