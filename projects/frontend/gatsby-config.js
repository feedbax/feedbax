/* eslint-disable @typescript-eslint/no-var-requires */
const config = require("./tsconfig.json");

const noop = () => undefined;
require.extensions[".mdx"] = noop;

require("source-map-support").install();
require("ts-node").register({
  ...config,

  compiler: "ttypescript",
  compilerOptions: {
    ...config.compilerOptions,

    module: "commonjs",
    target: "es2017",
  },
});

module.exports = require("./gatsby-config.ts");
