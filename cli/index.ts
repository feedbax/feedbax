import { cli } from 'tasksfile';

import { install, build } from './modules';
import { log } from './lib/utils';

const $install = {
  ...install,

  project: (): void => {
    log('[install:project] started');

    install.backend();

    log('[install:project] started');
  }
};


cli({
  install: { ...$install },
  build: { ...build },
});
