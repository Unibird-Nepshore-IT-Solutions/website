import { loadEnv } from "vite";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

const env = loadEnv(process.env.NODE_ENV, process.cwd(), "");

const site =
  env.PUBLIC_APP_URL ||
  (process.env.GITHUB_REPOSITORY
    ? `https://${process.env.GITHUB_REPOSITORY.split("/")[0]}.github.io`
    : "https://Unibird-Nepshore-IT-Solutions.github.io");
const base = process.env.GITHUB_REPOSITORY
  ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}`
  : "/";

export default defineConfig({
  site,
  base,

  vite: {
    plugins: [tailwindcss()],
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en", "ja", "np"],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [react()],
});
