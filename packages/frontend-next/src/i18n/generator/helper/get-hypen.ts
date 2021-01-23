import type { HyphenationFunctionSync } from 'hyphen';

type Hyphenate = {
  hyphenateSync: HyphenationFunctionSync;
  hyphenateHTMLSync: HyphenationFunctionSync;
}

export default (
  async function getHyphen (locale?: string): Promise<Hyphenate> {
    switch (locale) {
      case 'de': {
        return import('hyphen/de');
      }

      case 'en': {
        return import('hyphen/en');
      }

      default: {
        return {
          hyphenateSync: (text) => text,
          hyphenateHTMLSync: (text) => text,
        };
      }
    }
  }
);
