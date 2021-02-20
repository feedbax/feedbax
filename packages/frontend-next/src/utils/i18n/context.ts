import { createContext } from 'react';

export const TranslationContext = createContext<Translation>({} as Translation);
export const TranslationProvider = TranslationContext.Provider;
