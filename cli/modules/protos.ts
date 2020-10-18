import { sh } from 'tasksfile';
import { log } from '../lib/utils';

import type { ISyncShellOptions } from '@pawelgalazka/shell';

const _options: ISyncShellOptions = {
  cwd: 'projects/protos',
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

export const protos = {
  install: () => {
    log('[install:protos] started');

    _sh('yarn install');

    log('[install:protos] finished');
  },

  build: () => {
    log('[build:protos] started');

    _sh(`mkdir -p dist`);
    _sh(`npx pbjs -t static-module -w commonjs -o ./dist/protos.js $(find ./src -name '*.proto')`);
    _sh(`npx pbts -o ./dist/protos.d.ts ./dist/protos.js`);
    _sh(`cp package.json dist/package.json`);

    log('[build:protos] finished');
  },
};
