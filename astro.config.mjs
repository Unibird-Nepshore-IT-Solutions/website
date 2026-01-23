import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

const isGithubActions = !!process.env.GITHUB_ACTIONS;
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];

const site =
  process.env.PUBLIC_APP_URL ||
  "https://unibirdnepshore.com.np";

// Only use base when NOT on custom domain
const base =
  site.includes("github.io") && repo
    ? `/${repo}`
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
