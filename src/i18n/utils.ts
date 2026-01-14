import { defaultLang, ui, type Language } from "./ui";

const getLangFromUrl = (url: URL): Language => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const pathname = url.pathname.startsWith(base)
    ? url.pathname.slice(base.length)
    : url.pathname;
  const [, lang] = pathname.split("/");
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
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const pathname = url.pathname.startsWith(base)
    ? url.pathname.slice(base.length)
    : url.pathname;
  const parts = pathname.split("/").filter(Boolean);

  // Removing language code from path if present
  if (parts[0] && parts[0] in ui) {
    parts.shift();
  }

  return parts.join("/");
};

const getLocalizedPath = (path: string, locale: Language): string => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  if (locale === defaultLang) {
    return `${base}/${cleanPath}`;
  }
  return `${base}/${locale}/${cleanPath}`;
};

const getAssetPath = (path: string): string => {
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${base}/${cleanPath}`;
};

export {
  getLangFromUrl,
  useTranslations,
  getRouteFromUrl,
  getLocalizedPath,
  getAssetPath,
};
