/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

import path from 'path';

export const rootDir = process.cwd();

export default {
  plugins: [
    {
      resolve: 'gatsby-plugin-pnpm',

      options: {
        projectPath: rootDir,
        strict: true,

        include: [
          path.resolve(rootDir, '../../node_modules'),
          path.resolve(rootDir, '../../node_modules/.pnpm/node_modules'),
        ],
      },
    },

    {
      // source pages
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: path.join(rootDir, 'src/_pages'),
      },
    },

    {
      // source images
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(rootDir, 'src/assets/images'),
      },
    },

    {
      // source translations
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'locales',
        path: path.join(rootDir, 'src/locales'),
      },
    },

    // add typescript
    'gatsby-plugin-typescript',

    'gatsby-plugin-loadable-components-ssr',

    // transfrom images
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',

    {
      // add css-in-js
      resolve: 'gatsby-plugin-emotion',
      options: {
        sourceMap: true,
        autoLabel: 'dev-only',
        labelFormat: '[local]',
        cssPropOptimization: true,
      },
    },

    {
      // add inline svgs
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
  ],
};