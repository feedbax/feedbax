import path from 'path';

import config from 'tsconfig.json';
import createCustomEslintConfiguration from './create-custom-eslint-configuration';
// import licenseChecker from './license-checker';

import { rootDir } from '~config/gatsby-config';

import type { CreateWebpackConfigArgs } from 'gatsby';

const onCreateWebpackConfig = (
  (props: CreateWebpackConfigArgs): void => {
    const { actions, rules, store } = props;

    createCustomEslintConfiguration({ rules, store });

    const webpackAliasEntries = Object.entries(config.compilerOptions.paths);
    const webpackAlias: { [key: string]: string } = {};

    for (let i = 0; i < webpackAliasEntries.length; i += 1) {
      const [_pathSource, [_pathDestination]] = webpackAliasEntries[i];

      const pathSource = _pathSource.replace('/*', '');
      const pathDestination = _pathDestination.replace('/*', '');

      webpackAlias[pathSource] = path.resolve(rootDir, pathDestination);
    }

    actions.setWebpackConfig({
      resolve: {
        alias: webpackAlias,
      },
    });
  }
);

export default onCreateWebpackConfig;
