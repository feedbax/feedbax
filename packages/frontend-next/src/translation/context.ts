import { createContext } from 'react';
import defaultTranslation from './de/translations.json';

export const TranslationContext = createContext<Translation>(defaultTranslation);
export const TranslationProvider = TranslationContext.Provider;
export const TranslationConsumer = TranslationContext.Consumer;
