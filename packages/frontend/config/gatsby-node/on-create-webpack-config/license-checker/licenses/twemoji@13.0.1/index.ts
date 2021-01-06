// import fs from 'fs';
// import path from 'path';

// import type { Options } from 'license-checker-webpack-plugin';

// const dependency: Options['override'] = {
//   'twemoji@13.0.1': {
//     name: 'twemoji',
//     version: '13.0.1',
//     repository: 'https://github.com/twitter/twemoji',
//     licenseName: 'MIT',

//     get licenseText (): string {
//       const licensePath = (
//         path.join(
//           __dirname,
//           'LICENSE',
//         )
//       );

//       const licenseGraphicsPath = (
//         path.join(
//           __dirname,
//           'LICENSE-GRAPHICS',
//         )
//       );

//       return [
//         fs.readFileSync(licensePath, 'utf-8'),
//         fs.readFileSync(licenseGraphicsPath, 'utf-8'),
//       ].join('\n\n----------\n\n');
//     },
//   },
// };

// export default dependency;

export {};
