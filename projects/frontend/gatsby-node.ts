import path from 'path';
import fs from 'fs';

import type { CreateWebpackConfigArgs, CreatePageArgs } from 'gatsby';

import { locales, defaultLocale } from '~locales';

export const onCreateWebpackConfig = (
  (props: CreateWebpackConfigArgs): void => {
    const { actions, rules, store } = props;

    createCustomEslintConfiguration({ rules, store });

    actions.setWebpackConfig({
      resolve: {
        alias: {
          '~locales': path.resolve(__dirname, 'src/locales'),
          '~components': path.resolve(__dirname, 'src/components'),
          '~store': path.resolve(__dirname, 'src/store'),
          '~assets': path.resolve(__dirname, 'src/assets'),
          '~pages': path.resolve(__dirname, 'src/pages'),
          '~hooks': path.resolve(__dirname, 'src/hooks'),
          '~theme': path.resolve(__dirname, 'src/theme'),
        },
      },
    });
  }
);

type CustomEslintProps = {
  rules: CreateWebpackConfigArgs['rules'];
  store: CreateWebpackConfigArgs['store'];
};

const createCustomEslintConfiguration = (
  (props: CustomEslintProps) => {
    const { rules, store } = props;

    const { schema } = store.getState();
    const eslintRule = rules.eslint(schema, false);
    const { baseConfig } = eslintRule.use[0].options;

    baseConfig.parser = '@typescript-eslint/parser';
    baseConfig.parserOptions = {
      ...(baseConfig.parserOptions ?? {}),
      project: './tsconfig.json',
      tsconfigRootDir: './',
    };

    baseConfig.plugins = [
      ...(baseConfig.plugins ?? []),
      '@typescript-eslint',
      'import',
    ];

    baseConfig.extends = [
      ...baseConfig.extends,

      'airbnb',
      'plugin:import/typescript',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
    ];

    baseConfig.rules = {
      ...(baseConfig.rules ?? {}),

      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': ['error'],

      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': [
        'error',
      ],

      'no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '(^_)|(^React$)',
          argsIgnorePattern: '(^_)|(^React$)',
        },
      ],

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '(^_)|(^React$)',
          argsIgnorePattern: '(^_)|(^React$)',
        },
      ],

      'prefer-arrow-callback': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'func-style': [
        'error',
        'declaration', {
          allowArrowFunctions: true,
        },
      ],

      'react/jsx-filename-extension': [
        'error', {
          extensions: [
            '.tsx',
            '.jsx',
          ],
        },
      ],

      'import/extensions': [
        'error',
        'ignorePackages', {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],

      'import/no-duplicates': 'off',
      'import/order': 'off',
      'import/no-cycle': [
        'error',
        { maxDepth: 10 },
      ],

      'react/jsx-props-no-multi-spaces': 'off',
    };

    baseConfig.settings = {
      ...(baseConfig.settings ?? {}),

      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    };

    baseConfig.overrides = [
      ...(baseConfig.overrides ?? []),

      {
        files: ['**/*.{ts,tsx}'],
        rules: {
          'no-unused-vars': 'off',
        },
      },

      {
        files: ['**/*.{ts,tsx}'],
        rules: {
          'react/prop-types': 'off',
          'react/no-unused-prop-types': 'off',
          'react/require-default-props': 'off',
        },
      },
    ];

    fs.writeFileSync('.eslintrc', JSON.stringify(baseConfig, null, 2));
    throw new Error('stop');
  }
);

export const onCreatePage = async (props: CreatePageArgs): Promise<void> => {
  const { page } = props;

  if (/^\/dev-404-page\/?$/.test(page.path)) {
    return;
  }

  if (/^\/join\/?$/.test(page.path)) {
    createEventPage(props);
    return;
  }

  createOtherPages(props);
};

const createEventPage = (props: CreatePageArgs) => {
  const { page, actions } = props;
  const { createPage, deletePage } = actions;

  deletePage(page);

  createPage({
    ...page,

    path: '/@',
    matchPath: '/@/:eventId',

    context: {
      originalPath: '/@',
      originalMatchPath: '/@/:eventId',
      locale: defaultLocale,
    },
  });

  for (let i = 0; i < locales.length; i += 1) {
    const locale = locales[i];

    createPage({
      ...page,

      path: `/${locale}/@`,
      matchPath: `/${locale}/@/:eventId`,

      context: {
        originalPath: '/@',
        originalMatchPath: '/@/:eventId',
        locale,
      },
    });
  }
};

const createOtherPages = (props: CreatePageArgs) => {
  const { page, actions } = props;
  const { createPage, deletePage } = actions;

  deletePage(page);

  createPage({
    ...page,

    context: {
      originalPath: page.path,
      locale: defaultLocale,
    },
  });

  for (let i = 0; i < locales.length; i += 1) {
    const locale = locales[i];

    createPage({
      ...page,

      path: path.join(`/${locale}/`, page.path),
      matchPath: path.join(`/${locale}/`, page.path),

      context: {
        originalPath: page.path,
        locale,
      },
    });
  }
};
