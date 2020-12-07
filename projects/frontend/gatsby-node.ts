import path from "path";
import { locales } from "~i18n/locales";

import type { CreateWebpackConfigArgs } from "gatsby";
import type { CreatePageArgs } from "gatsby";

export const onCreateWebpackConfig = ({ actions }: CreateWebpackConfigArgs) => {
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

export const onCreatePage = async ({ page, actions }: CreatePageArgs) => {
  const { createPage, deletePage } = actions;

  if (/^\/dev-404-page\/?$/.test(page.path)) {
    return;
  }

  if (page.path.match(/\/join/)) {
    deletePage(page);

    createPage({
      ...page,

      path: "/@",
      matchPath: "/@/*",

      context: {
        originalPath: "/@",
        locale: "de",
      },
    });

    for (let i = 0; i < locales.length; i += 1) {
      const locale = locales[i];

      createPage({
        ...page,

        path: `/${locale}/@`,
        matchPath: `/${locale}/@/*`,

        context: {
          originalPath: "/@",
          locale,
        },
      });
    }
  } else {
    deletePage(page);

    createPage({
      ...page,

      context: {
        originalPath: page.path,
        locale: "de",
      },
    });

    for (let i = 0; i < locales.length; i += 1) {
      const locale = locales[i];

      createPage({
        ...page,

        path: path.join(`/${locale}/`, page.path),
        matchPath: path.join(`/${locale}/`, page.path),

        context: {
          originalPath: page.path,
          locale,
        },
      });
    }
  }
};
