/* eslint-disable @typescript-eslint/no-var-requires */

const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,

  modulePathIgnorePatterns: ['<rootDir>/dist'],
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths,
    { prefix: '<rootDir>' },
  ),

  testMatch: [
    '**/src/**/(*.)+(e2e).[jt]s?(x)',
  ],
};
