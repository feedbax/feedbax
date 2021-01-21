import { createContext } from 'react';

export const TranslationContext = createContext({} as Translation);
export const TranslationProvider = TranslationContext.Provider;
export const TranslationConsumer = TranslationContext.Consumer;
