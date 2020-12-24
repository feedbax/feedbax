import { createContext } from 'react';
import { defaultLocale } from '~locales/const';
import type { Context, TranslationDataClean } from './types';

const TranslationContext = createContext<Context>({
  translation: {} as unknown as TranslationDataClean,
  locale: defaultLocale,
  locales: [defaultLocale],
});

export default TranslationContext;
