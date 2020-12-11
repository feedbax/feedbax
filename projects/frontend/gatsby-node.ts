import path from "path";
import { locales, defaultLocale } from "~i18n/locales";

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

export const onCreatePage = async (props: CreatePageArgs) => {
  const { page } = props;

  if (/^\/dev-404-page\/?$/.test(page.path)) {
    return;
  }

  if (/^\/join\/?$/.test(page.path)) {
    return createEventPage(props);
  }

  return createOtherPages(props);
};

const createEventPage = (props: CreatePageArgs) => {
  const { page, actions } = props;
  const { createPage, deletePage } = actions;

  deletePage(page);

  createPage({
    ...page,

    path: "/@",
    matchPath: "/@/:eventId",

    context: {
      originalPath: "/@",
      originalMatchPath: "/@/:eventId",
      locale: defaultLocale,
    },
  });

  for (let i = 0; i < locales.length; i += 1) {
    const locale = locales[i];

    createPage({
      ...page,

      path: `/${locale}/@`,
      matchPath: `/${locale}/@/:eventId`,

      context: {
        originalPath: "/@",
        originalMatchPath: "/@/:eventId",
        locale,
      },
    });
  }
};

const createOtherPages = (props: CreatePageArgs) => {
  const { page, actions } = props;
  const { createPage, deletePage } = actions;

  deletePage(page);

  createPage({
    ...page,

    context: {
      originalPath: page.path,
      locale: defaultLocale,
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
};
