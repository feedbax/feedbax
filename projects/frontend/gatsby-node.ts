import _onCreateNode from './config/gatsby-node/on-create-node';
import _onCreateWebpackConfig from './config/gatsby-node/on-create-webpack-config';
import _createPages from './config/gatsby-node/create-pages';

export const onCreateNode = _onCreateNode;
export const onCreateWebpackConfig = _onCreateWebpackConfig;
export const createPages = _createPages;
