import { defineConfig } from "vite";
import tailwindcss from "tailwindcss";

// vite.config.js
export default defineConfig({
  css: {
    postcss: [tailwindcss],
  },
});
