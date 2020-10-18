import { sh } from 'tasksfile';
import { log } from '../lib/utils';

import { build, install } from './index';

import type { ISyncShellOptions } from '@pawelgalazka/shell';

const _options: ISyncShellOptions = {
  cwd: 'projects/api',
  async: false,
  nopipe: true,
};

const _sh = (
  (cmd: string) => {
    sh(cmd, {
      ..._options,
    });
  }
);

export const api = {
  install: () => {
    log('[install:api] started');

    install.protos();
    build.protos();

    _sh('yarn install');

    log('[install:api] finished');
  },

  build: () => {
    log('[build:api] started');

    build.protos();

    _sh(`rm -rf dist`);
    _sh(`npx ttsc`);
    _sh(`cp package.json dist/package.json`);

    log('[build:api] finished');
  },
};
