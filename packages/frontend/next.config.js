const path = require('path');
const { LicenseWebpackPlugin } = require('license-webpack-plugin');

const i18nConfig = require('./src/lib/i18n/config.json');

module.exports = {
  pageExtensions: ['page.tsx', 'page.ts'],

  i18n: {
    locales: i18nConfig.locales,
    defaultLocale: i18nConfig.defaultLocale,
  },

  webpack: (config, { dev, isServer }) => {
    if (dev === false && isServer == false) {
      const nextDir = path.join(process.cwd(), '.next');
      const licensesPath = path.join(process.cwd(), `licenses.json`);

      config.plugins.push(new LicenseWebpackPlugin({
        outputFilename: path.relative(nextDir, licensesPath),
        perChunkOutput: false,

        unacceptableLicenseTest: (licenseType) => {
          const whitelist = [
            'MIT',
            '0BSD',
            'Apache-2.0',
            'ISC',
            'BSD-3-Clause'
          ];

          return !whitelist.includes(licenseType);
        },

        renderLicenses: (modules) => {
          const licenses = [];

          for (let i = 0; i < modules.length; i += 1) {
            const module = modules[i];
            let _tempA, _tempB, _tempC;

            licenses.push({
              name: module.name,
              version:
                  (_tempA = module.packageJson.version) !== null
                && _tempA !== void 0 ? _tempA : null,

              author:
                  typeof module.packageJson.author === 'string'
                  ? module.packageJson.author
                  : (_tempC = (_tempB = module.packageJson.author) === null
                    || _tempB === void 0 ? void 0 : _tempB.name) !== null
                    && _tempC !== void 0 ? _tempC : null,

              license: module.licenseId,
              licenseText: module.licenseText,
            });
          }

          const sortedLicenses = licenses
            .sort((licenseA, licenseB) => licenseA.name.localeCompare(licenseB.name));

          return JSON.stringify(sortedLicenses, null, 2);
        },

        stats: {
          warnings: false,
          errors: true
        }
      }));  
    }

    return config
  },
};
