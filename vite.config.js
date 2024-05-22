import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default defineConfig({
  plugins: [checker({ typescript: true }), vanillaExtractPlugin()],
  define: {
    API_URL: "'https://v3n9s-tmdb-proxy.onrender.com/api'",
    IMAGES_URL: "'https://v3n9s-tmdb-proxy.onrender.com/image'",
  },
  clearScreen: false,
});
