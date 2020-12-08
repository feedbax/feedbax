import de from "~i18n/locales/de";
import en from "~i18n/locales/en";

export const translations = { de, en };
export const locales = Object.keys(translations);
export const defaultLocale = "de";

export type Locales = keyof typeof translations;
export type Translations = typeof translations[Locales];
