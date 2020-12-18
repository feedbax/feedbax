/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

import path from 'path';

global.rootDir = __dirname;

export default {
  plugins: [
    {
      // automatically generate typings from graphql schema
      resolve: 'gatsby-plugin-generate-typings',
      options: {
        dest: 'src/graphql-types.d.ts',
      },
    },

    {
      // source pages
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: path.join(__dirname, 'src/_pages'),
      },
    },

    {
      // source images
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src/assets/images'),
      },
    },

    {
      // source translations
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'locales',
        path: path.join(__dirname, 'src/locales'),
      },
    },

    // add typescript
    'gatsby-plugin-typescript',

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
