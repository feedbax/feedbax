import { createRenderer, IConfig } from 'fela';
import plugins from './plugins';

const config: IConfig = { plugins };
export const renderer = createRenderer(config);
