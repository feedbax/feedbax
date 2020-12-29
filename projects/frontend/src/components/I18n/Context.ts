import { createContext } from 'react';
import { defaultLocale } from '~locales/const';
import type { Context } from './types';

type TranslationData = import('~types/translation').Data;

const TranslationContext = createContext<Context>({
  translation: {} as unknown as TranslationData,
  locale: defaultLocale,
  locales: [defaultLocale],
});

export default TranslationContext;
