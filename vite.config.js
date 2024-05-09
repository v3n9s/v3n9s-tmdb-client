import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default defineConfig({
  plugins: [checker({ typescript: true }), vanillaExtractPlugin()],
  clearScreen: false,
});
