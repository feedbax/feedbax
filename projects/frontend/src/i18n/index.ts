// import i18n from "i18next";
// import LanguageDetector from "i18next-browser-languagedetector";

import { createContext } from "react";
// import { initReactI18next } from "react-i18next";

import { locales, translations } from "~i18n/locales";
export { locales, translations } from "~i18n/locales";

import type { Locales, Translations } from "~i18n/locales";

export const languages = locales;

type Context = {
  locale: Locales;
  originalPath: string;
  translation: Translations;
};

export const TranslationContext = createContext<Context>({
  locale: "de",
  originalPath: "/",
  translation: translations.de,
});

// i18n
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     resources: { ...translations },

//     fallbackLng: [...locales],

//     interpolation: {
//       escapeValue: false,
//     },
//   });

// export default i18n;
