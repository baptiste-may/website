import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import astro from "eslint-plugin-astro";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";
import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

const typedAstroRules = tseslint.configs.recommendedTypeChecked.reduce(
  (rules, config) => ({ ...rules, ...config.rules }),
  {},
);

export default defineConfig([
  { ignores: ["dist/**", ".astro/**", ".sanity/**", "src/types/sanity-typegen.d.ts"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  ...astro.configs["jsx-a11y-recommended"],
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.node } },
  { files: ["**/*.astro"], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  {
    plugins: { "unused-imports": unusedImports },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
      ],
      eqeqeq: ["error", "always"],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-else-return": "error",
      "object-shorthand": ["error", "always"],
      "prefer-template": "error",
    },
  },
  {
    files: ["**/*.{ts,mts,cts,tsx,astro}"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        { assertionStyle: "as", objectLiteralTypeAssertions: "never" },
      ],
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/array-type": ["error", { default: "array" }],
      "@typescript-eslint/no-inferrable-types": "error",
    },
  },
  {
    files: ["**/*.{ts,mts,cts,tsx}"],
    extends: [...tseslint.configs.recommendedTypeChecked],
    rules: { "@typescript-eslint/no-unused-vars": "off" },
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
  },
  {
    files: ["**/*.astro"],
    rules: { ...typedAstroRules, "@typescript-eslint/no-unused-vars": "off" },
    languageOptions: { parserOptions: { project: true, tsconfigRootDir: import.meta.dirname } },
  },
  {
    files: ["**/*.astro"],
    plugins: { "better-tailwindcss": betterTailwindcss },
    settings: {
      "better-tailwindcss": { entryPoint: "src/assets/css/main.css", detectComponentClasses: true },
    },
    rules: {
      "better-tailwindcss/enforce-consistent-class-order": "error",
      "better-tailwindcss/no-conflicting-classes": "error",
      "better-tailwindcss/no-duplicate-classes": "error",
      "better-tailwindcss/no-unknown-classes": [
        "error",
        {
          ignore: ["^menu-active$", "^error-icon$", "^skip-link$", "^timeline-(item|line|filler)$"],
        },
      ],
    },
  },
  eslintConfigPrettier,
  { files: ["src/env.d.ts"], rules: { "@typescript-eslint/consistent-type-definitions": "off" } },
  {
    rules: {
      // `eslint-config-prettier` disables this rule, but Prettier does not add braces.
      curly: ["error", "all"],
    },
  },
]);
