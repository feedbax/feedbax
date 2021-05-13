const path = require('path');
const LicensePlugin = require('webpack-license-plugin');

const i18nConfig = require('./src/i18n/config.json');

module.exports = {
  pageExtensions: ['page.tsx', 'page.ts'],

  i18n: {
    locales: i18nConfig.locales,
    defaultLocale: i18nConfig.defaultLocale,
  },

  webpack: (config, { dev }) => {
    if (dev === false) {
      const nextDir = path.join(process.cwd(), '.next');
      const licensesPath = path.join(process.cwd(), 'licenses.json')
  
      const licensePlugin = new LicensePlugin({
        outputFilename: path.relative(nextDir, licensesPath),
  
        unacceptableLicenseTest: (licenseIdentifier) => {
          const blacklist = [
            'GPL-3.0-only',
            'AGPL-3.0-only',
            'LGPL-3.0-only',
            'GPL-2.0+',
            'LGPL-2.1',
            'GPL-3.0-or-later',
            'GPL-2.0-only',
          ];
  
          return blacklist.includes(licenseIdentifier);
        },
      });
  
      config.plugins.push(licensePlugin);  
    }

    return config
  },
};
