const path = require("path");

exports.onCreateWebpackConfig = ({ actions, rules }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "~i18n": path.resolve(__dirname, "src/i18n"),
        "~components": path.resolve(__dirname, "src/components"),
        "~store": path.resolve(__dirname, "src/store"),
        "~assets": path.resolve(__dirname, "src/assets"),
        "~pages": path.resolve(__dirname, "src/pages"),
        "~hooks": path.resolve(__dirname, "src/hooks"),
        "~theme": path.resolve(__dirname, "src/theme"),
      },
    },
  });
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path.match(/\/join/)) {
    page.matchPath = "/@/*";
    createPage(page);
  }
};
