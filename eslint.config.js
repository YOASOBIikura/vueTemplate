import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import Prettier from "eslint-plugin-prettier";
import PrettierRecommended from "eslint-plugin-prettier/recommended";
import vueParser from "vue-eslint-parser";
import { FlatCompat } from "@eslint/eslintrc";
import * as path from "node:path";
import { fileURLToPath } from "url";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname, // optional; default: process.cwd()
  resolvePluginsRelativeTo: __dirname, // optional
  recommendedConfig: js.configs.recommended, // optional unless you're using "eslint:recommended"
  allConfig: js.configs.all, // optional unless you're using "eslint:all"
});

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/*.config.js",
      "!**/eslint.config.js",
      "**/prettierrc.json",
    ],
  },
  { files: ["**/*.{js,mjs,cjs,vue}"] },
  {
    languageOptions: {
      globals: globals.browser,
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
      },
    },
  },
  pluginJs.configs.recommended,
  PrettierRecommended,
  ...pluginVue.configs["flat/essential"],
  ...compat.config({
    extends: ["eslint:recommended"],
  }),
  {
    plugins: {
      pluginVue,
      Prettier,
    },
    rules: {
      "prettier/prettier": "off",
      "eqeqeq": "off",
    },
  },
];
