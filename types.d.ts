declare module "eslint-plugin-react/configs/recommended.js" {
  import type { Linter } from "eslint";
  const c: Linter.FlatConfig;
  export = c;
}

declare module "eslint-plugin-react/configs/jsx-runtime.js" {
  import type { Linter } from "eslint";
  const c: Linter.FlatConfig;
  export = c;
}

declare module "eslint-plugin-react-hooks" {
  import type { ESLint, Linter } from "eslint";
  const p: ESLint.Plugin & {
    configs: {
      recommended: ESLint.ConfigData & {
        rules: Linter.RulesRecord;
      };
    };
  };
  export = p;
}
