import { api } from './api';
import { backend } from './backend';
import { protos } from './protos';

export const install = {
  api: api.install,
  backend: backend.install,
  protos: protos.install,
};

export const build = {
  api: api.build,
  backend: backend.build,
  protos: protos.build,
};

export default { build, install };