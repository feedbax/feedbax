import path from 'path';
import type { CreatePagesArgs } from 'gatsby';

type Query = import('~graphql-types').Query;
type TranslationData = import('~graphql-types').TranslationData;
type Locales = string[];

type GraphQl = CreatePagesArgs['graphql'];
type TranslationsMap = Map<string, TranslationData>;

const getLocales = (
  async (graphql: GraphQl): Promise<Locales> => {
    const localesData = await graphql<Query>(`
      query Locales {
        locales {
          data
        }
      }
    `);

    const locales = localesData.data?.locales?.data?.filter(
      (maybeString): maybeString is string => typeof maybeString === 'string',
    );

    return locales ?? [];
  }
);

const getTranslations = (
  async (graphql: GraphQl, locales: string[]): Promise<TranslationsMap> => {
    const { translationFragment } = await import('~locales/const');

    const translations = new Map<string, TranslationData>();
    const promises: Promise<void>[] = [];

    const getTranslation = (
      async (locale: string) => {
        const translationData = await graphql<Query>(`
          ${translationFragment}

          query Translation($locale: String = "de") {
            translation(locale: {eq: $locale}) {
              ...translationData
            }
          }
        `, { locale });

        if (translationData.data?.translation?.data) {
          translations.set(locale, translationData.data.translation.data);
        }
      }
    );

    for (let i = 0; i < locales.length; i += 1) {
      const locale = locales[i];

      if (locale) {
        const getTranslationPromise = getTranslation(locale);
        promises.push(getTranslationPromise);
      }
    }

    await Promise.all(promises);

    return translations;
  }
);

type Page = {
  filePath: string;
  path: string;
  matchPath?: string;
};

type Pages = Page[];

const getPages = (
  async (graphql: GraphQl): Promise<Pages> => {
    const allPagesData = await graphql<Query>(`
      query {
        allFile(filter: {sourceInstanceName: {eq: "pages"}, ext: {eq: ".tsx"}}) {
          nodes {
            name
            relativeDirectory
            absolutePath
          }
        }
      }
    `);

    if (allPagesData.data?.allFile?.nodes) {
      const allPages = (
        allPagesData
          .data
          .allFile
          .nodes

          .map((f) => ({
            filePath: f.absolutePath,
            path: path.join('/', f.relativeDirectory, f.name === 'index' ? '' : f.name),
          }))

          .filter(
            (f): f is Page => (
              typeof f.filePath === 'string'
              && typeof f.path === 'string'
            ),
          )
      );

      return allPages;
    }

    return [];
  }
);

type CreatePageProps = {
  props: CreatePagesArgs;
  translations: TranslationsMap;
  defaultLocale: string;
  locales: string[];
};

const _createPage = (
  (page: Page, props: CreatePageProps): void => {
    const _page = { ...page };

    const { defaultLocale, locales } = props;
    const { translations } = props;

    const { props: _props } = props;
    const { actions } = _props;
    const { createPage } = actions;

    if (_page.path === '/join') {
      _page.path = '/@';
      _page.matchPath = '/@/*';
    }

    if (_page.path === '/home') {
      _page.path = '/';
    }

    createPage({
      component: _page.filePath,
      matchPath: _page.matchPath,
      path: _page.path,

      context: {
        locale: defaultLocale,
        locales,

        translation: translations.get(defaultLocale),
      },
    });

    for (let j = 0; j < locales.length; j += 1) {
      const locale = locales[j];

      createPage({
        component: _page.filePath,
        matchPath: _page.matchPath ? path.join('/', locale, _page.matchPath) : undefined,
        path: path.join('/', locale, _page.path),

        context: {
          locale,
          locales,

          translation: translations.get(locale),
        },
      });
    }
  }
);

const createTranslatedPages = (
  async (props: CreatePagesArgs): Promise<void> => {
    const { graphql } = props;
    const { defaultLocale } = await import('~locales/const');

    const locales = await getLocales(graphql);
    const translations = await getTranslations(graphql, locales);
    const allPages = await getPages(graphql);

    for (let i = 0; i < allPages.length; i += 1) {
      const page = allPages[i];

      _createPage(page, {
        props,
        locales,
        translations,
        defaultLocale,
      });
    }
  }
);

export default createTranslatedPages;
