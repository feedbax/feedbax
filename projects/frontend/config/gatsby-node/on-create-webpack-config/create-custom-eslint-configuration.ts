import fs from 'fs';
import type { CreateWebpackConfigArgs } from 'gatsby';

type CustomEslintProps = {
  rules: CreateWebpackConfigArgs['rules'];
  store: CreateWebpackConfigArgs['store'];
};

const createCustomEslintConfiguration = (
  (props: CustomEslintProps): void => {
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
      '@typescript-eslint/no-use-before-define': ['error'],

      'space-before-function-paren': 'off',
      '@typescript-eslint/space-before-function-paren': ['error'],

      indent: 'off',
      '@typescript-eslint/indent': ['error', 2],

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
      'no-underscore-dangle': 'off',
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

      {
        files: ['**/styles.ts'],
        rules: {
          'import/prefer-default-export': 'off',
          '@typescript-eslint/indent': 'off',
          'no-multi-spaces': 'off',
          'array-bracket-spacing': 'off',
        },
      },

      {
        files: ['**/reducer.ts'],
        rules: {
          'no-param-reassign': 'off',
        },
      },
    ];

    fs.writeFileSync('.eslintrc', JSON.stringify(baseConfig, null, 2));
  }
);

export default createCustomEslintConfiguration;
