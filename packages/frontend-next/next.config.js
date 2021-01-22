/* eslint-disable */

const path = require('path');
const LicensePlugin = require('webpack-license-plugin');

const config = require('./src/i18n/config.json');

module.exports = {
  i18n: {
    locales: config.locales,
    defaultLocale: config.defaultLocale,
  },

  webpack: (config, { dev }) => {
    if (dev === false) {
      const nextDir = path.join(process.cwd(), '.next');
      const licensesPath = path.join(process.cwd(), 'licenses.json')
  
      const licensePlugin = new LicensePlugin({
        outputFilename: path.relative(nextDir, licensesPath),
  
        unacceptableLicenseTest: (licenseIdentifier) => {
          const blacklist = [
            'GPL',
            'AGPL',
            'LGPL',
            'NGPL',
          ];
  
          return blacklist.includes(licenseIdentifier);
        },
      });
  
      config.plugins.push(licensePlugin);  
    }

    return config
  },
}
