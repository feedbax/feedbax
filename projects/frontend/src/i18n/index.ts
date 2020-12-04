import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { initReactI18next } from "react-i18next";

import de from "~i18n/locales/de";
import en from "~i18n/locales/en";

export const languages = ["de", "en"];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { de, en },

    fallbackLng: languages,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
