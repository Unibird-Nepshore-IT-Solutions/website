import { defineMiddleware } from "astro:middleware";
import { defaultLang } from "./i18n/ui";

export const onRequest = defineMiddleware(async (context, next) => {
  const locale = context.currentLocale || defaultLang;
  context.locals.locale = locale;

  return next();
});
