/* eslint-disable @typescript-eslint/no-var-requires */
const config = require("./tsconfig.json");

require("source-map-support").install();
require("ts-node").register({
  files: true,

  ...config,

  compiler: "ttypescript",
  compilerOptions: {
    ...config.compilerOptions,

    module: "commonjs",
    target: "es2017",
  },
});

module.exports = require("./gatsby-config.ts");
