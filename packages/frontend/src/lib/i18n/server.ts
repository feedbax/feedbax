import type { RenderPage } from 'next/dist/next-server/lib/utils';

type CacheEntry = {
  args: string[];
  translation: string;
};

export default (
  class I18nServer {
    static cacheArray: CacheEntry[];

    static extractTranslation(renderPage: RenderPage): string {
      I18nServer.cacheArray = [];
      renderPage();

      const translations = {};

      for (let i = 0; i < I18nServer.cacheArray.length; i += 1) {
        const { args, translation } = I18nServer.cacheArray[i];
        let $translations: any = translations;

        for (let j = 0; j < args.length; j += 1) {
          const arg = args[j];
          const isLastIteration = j === args.length - 1;
          const keyExists = arg in $translations;

          if (isLastIteration) {
            $translations[arg] = translation;
          } else if (keyExists) {
            $translations = $translations[arg];
          } else {
            $translations[arg] = {};
            $translations = $translations[arg];
          }
        }

        $translations = translation;
      }

      return JSON.stringify(translations);
    }
  }
);
