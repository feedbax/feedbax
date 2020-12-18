import { createContext } from 'react';
import { defaultLocale } from '~locales/const';

import type { Context } from './types';

const TranslationContext = createContext<Context>({
  translation: {},
  locale: defaultLocale,
  locales: [defaultLocale],

  location: {
    path: '/',
    params: {},
  },
});

export default TranslationContext;
