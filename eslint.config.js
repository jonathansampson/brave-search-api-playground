import js from '@eslint/js';
import sveltePlugin from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import stylistic from '@stylistic/eslint-plugin';
import globals from 'globals';

const globalConfigs = [
  stylistic.configs['recommended-flat'],
  {
    /**
     * These are rules that will apply across all JavaScript,
     * TypeScript, and Svelte files.
     */
    files: ['**/*.js', '**/*.ts', '**/*.svelte'],
    rules: {
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/block-spacing': ['error', 'always'],
      '@stylistic/space-before-function-paren': ['error', 'always'],
    },
  },
];

const jsConfigsArray = [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      'prettier': prettierPlugin,
      '@stylistic': stylistic,
    },
  },
];

const tsConfigsArray = [
  ...tseslint.config(...tseslint.configs.recommended, ...tseslint.configs.stylistic),
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      '@stylistic': stylistic,
    },
  },
];

const svelteConfigsArray = [
  ...sveltePlugin.configs['flat/recommended'],
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        /**
         * The `parser` option allows us to specify a parser for
         * <script> tags in the Svelte file. Because we're using
         * <script lang="ts">, we will specify TypeScript as our
         * preferred parser.
         */
        parser: {
          ts: tsParser,
        },
        extraFileExtensions: ['.svelte'],
      },
      globals: {
        /**
         * This pulls-in variables that are global within the
         * browser context (e.g., `document`, `console`, etc.).
         */
        ...globals.browser,
      },
    },
    plugins: {
      /**
       * Because we specify `files` above, the plugins listed
       * below will be available only to the files specified.
       */
      'prettier': prettierPlugin,
      '@stylistic': stylistic,
    },
  },
];

const final = [
  /**
   * Important to note that each configuration array may contain
   * properties or rules that override a previous configuration.
   * If you notice that a rule is not being applied, it may be
   * that a later configuration is overriding the rule.
   */
  ...globalConfigs,
  ...jsConfigsArray,
  ...tsConfigsArray,
  ...svelteConfigsArray,
];

export default final;
