import { createContext } from 'react';
import { translations, defaultLocale } from '~locales';
import type { Context } from './types';

const TranslationContext = createContext<Context>({
  translation: translations.de,
  locale: defaultLocale,

  location: {
    path: '/',
    params: {},
  },
});

export default TranslationContext;
