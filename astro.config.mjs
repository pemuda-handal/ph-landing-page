import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [svelte()],
  output: "static",
  adapter: vercel(),
  i18n: {
    defaultLocale: "id",
    locales: ["id", "en"],
  },
});
