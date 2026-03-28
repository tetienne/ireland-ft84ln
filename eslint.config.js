import prettier from "eslint-config-prettier";
import path from "node:path";
import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import svelte from "eslint-plugin-svelte";
import { defineConfig } from "eslint/config";
import globals from "globals";
import svelteConfig from "./svelte.config.js";

const gitignorePath = path.resolve(import.meta.dirname, ".gitignore");

export default defineConfig(
  [
    includeIgnoreFile(gitignorePath),
    js.configs.recommended,
    svelte.configs.recommended,
    {
      languageOptions: { globals: { ...globals.browser, ...globals.node } },
    },
    {
      files: ["**/*.svelte", "**/*.svelte.js"],
      languageOptions: { parserOptions: { svelteConfig } },
      rules: {
        // data.json content is trusted — {@html} is safe
        "svelte/no-at-html-tags": "off",
        // External links with target="_blank" are intentional
        "svelte/no-navigation-without-resolve": "off",
      },
    },
    {
      // Legacy file, will be removed after migration merge
      files: ["app.js"],
      rules: { "no-undef": "off" },
    },
  ],
  prettier,
  svelte.configs.prettier,
);
