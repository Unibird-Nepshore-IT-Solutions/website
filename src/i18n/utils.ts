import { defaultLang, ui, type Language } from "./ui";

const getLangFromUrl = (url: URL): Language => {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as Language;
  return defaultLang;
};

const useTranslations = (lang: Language) => {
  return (key: string): string => {
    const keys = key.split(".");
    let value: any = ui[lang];

    for (const k of keys) {
      value = value?.[k];
    }

    if (value === undefined) {
      let fallback: any = ui[defaultLang];

      for (const k of keys) {
        fallback = fallback?.[k];
      }

      return fallback || key;
    }

    return value;
  };
};

const getRouteFromUrl = (url: URL) => {
  const pathname = url.pathname;
  const parts = pathname.split("/").filter(Boolean);

  // Removing language code from path if present
  if (parts[0] && parts[0] in ui) {
    parts.shift();
  }

  return parts.join("/");
};

const getLocalizedPath = (path: string, locale: Language): string => {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `/${locale}/${cleanPath}`;
};

export { getLangFromUrl, useTranslations, getRouteFromUrl, getLocalizedPath };
