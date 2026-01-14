import { loadEnv } from "vite";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

const env = loadEnv(process.env.NODE_ENV, process.cwd(), "");

export default defineConfig({
  site: env.PUBLIC_APP_URL,
  base: env.PUBLIC_BASE_URL,

  vite: {
    plugins: [tailwindcss()],
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en", "ja", "np"],
    routing: {
      prefixDefaultLocale: true,
    },
  },

  integrations: [react()],
});
