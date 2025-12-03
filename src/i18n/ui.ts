import en from "./locales/en.json";
import ja from "./locales/ja.json";
import np from "./locales/np.json";

const languages = {
  en: "(EN) English",
  ja: "(JP) 日本語",
  np: "(NP) नेपाली",
};

const defaultLang = "en";

const ui = { en, ja, np } as const;

export { languages, defaultLang, ui };

export type TranslationKeys = typeof en;
export type Language = keyof typeof languages;
