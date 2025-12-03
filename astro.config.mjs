import { loadEnv } from "vite";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

const { PUBLIC_APP_URL } = loadEnv(
  process.env.PUBLIC_APP_URL,
  process.cwd(),
  ""
);

export default defineConfig({
  site: PUBLIC_APP_URL,

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