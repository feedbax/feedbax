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
            path: path.join('/', f.relativeDirectory, f.name),
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

const createTranslatedPages = (
  async (props: CreatePagesArgs): Promise<void> => {
    const { graphql, actions } = props;
    const { createPage } = actions;

    const { defaultLocale } = await import('~locales/const');

    const locales = await getLocales(graphql);
    const translations = await getTranslations(graphql, locales);
    const allPages = await getPages(graphql);

    for (let i = 0; i < allPages.length; i += 1) {
      const page = allPages[i];

      if (page.path === '/join') {
        page.path = '/@';
        page.matchPath = '/@/:eventId';
      }

      if (page.path === '/home') {
        page.path = '/';
      }

      createPage({
        component: page.filePath,
        matchPath: page.matchPath,
        path: page.path,

        context: {
          locale: defaultLocale,
          locales,

          translation: translations.get(defaultLocale),
          originalPath: page.path,
          originalMatchPath: page.matchPath,
        },
      });

      for (let j = 0; j < locales.length; j += 1) {
        const locale = locales[j];

        createPage({
          component: page.filePath,
          matchPath: page.matchPath ? path.join('/', locale, page.matchPath) : undefined,
          path: path.join('/', locale, page.path),

          context: {
            locale,
            locales,

            translation: translations.get(locale),
            originalPath: page.path,
            originalMatchPath: page.matchPath,
          },
        });
      }
    }

    // console.log('defaultLocale', defaultLocale);
    // console.log('locales', JSON.stringify(locales, null, 2));
    // console.log('_translations', JSON.stringify(_translations, null, 2));
  }
);

export default createTranslatedPages;
