import path from "path";
import { fileURLToPath } from "url";
import tseslint from "typescript-eslint";
import reactPluginRecommendedConfig from "eslint-plugin-react/configs/recommended.js";
import reactPluginJsxRuntimeConfig from "eslint-plugin-react/configs/jsx-runtime.js";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import prettierPluginConfig from "eslint-plugin-prettier/recommended";

/** @satisfies {import("eslint").Linter.FlatConfig} */
const reactHooksConfig = {
  plugins: {
    "react-hooks": reactHooksPlugin,
  },
  rules: reactHooksPlugin.configs.recommended.rules,
};

export default tseslint.config({
  files: [
    "src/**/*.ts?(x)",
    "types.d.ts",
    "eslint.config.js",
    "vite.config.js",
  ],
  languageOptions: {
    parserOptions: {
      project: true,
      tsconfigRootDir: path.dirname(fileURLToPath(import.meta.url)),
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    ...tseslint.configs.strictTypeChecked,
    reactPluginRecommendedConfig,
    reactPluginJsxRuntimeConfig,
    reactHooksConfig,
    prettierPluginConfig,
  ],
  rules: {
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { allowExpressions: true },
    ],
    "@typescript-eslint/strict-boolean-expressions": ["error"],
  },
});
