import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

const site = process.env.PUBLIC_APP_URL || "https://unibirdnepshore.com.np";

export default defineConfig({
  site,
  output: "server",
  adapter: vercel(),

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
