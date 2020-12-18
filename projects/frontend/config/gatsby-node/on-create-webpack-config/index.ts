import path from 'path';
import createCustomEslintConfiguration from './create-custom-eslint-configuration';

import type { CreateWebpackConfigArgs } from 'gatsby';

const onCreateWebpackConfig = (
  (props: CreateWebpackConfigArgs): void => {
    const { actions, rules, store } = props;

    createCustomEslintConfiguration({ rules, store });

    actions.setWebpackConfig({
      resolve: {
        alias: {
          '~locales': path.resolve(global.rootDir, 'src/locales'),
          '~lib': path.resolve(global.rootDir, 'src/lib'),
          '~components': path.resolve(global.rootDir, 'src/components'),
          '~store': path.resolve(global.rootDir, 'src/store'),
          '~assets': path.resolve(global.rootDir, 'src/assets'),
          '~pages': path.resolve(global.rootDir, 'src/pages'),
          '~hooks': path.resolve(global.rootDir, 'src/hooks'),
          '~theme': path.resolve(global.rootDir, 'src/theme'),
        },
      },
    });
  }
);

export default onCreateWebpackConfig;
