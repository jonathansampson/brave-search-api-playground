// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin'

export default [
  eslint.configs.recommended,
  stylistic.configs['recommended-flat'],
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/space-in-parens': ['error', 'never'],
      '@stylistic/padded-blocks': ['error', {
        blocks: 'never',
        classes: 'always',
        switches: 'always',
      }],
      '@stylistic/space-before-function-paren': ['error', 'always'],
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: 'let', next: 'const' },
        { blankLine: 'always', prev: 'const', next: 'let' },
      ],
    },
  },
  {
    ignores: ['eslint.config.mjs', 'node_modules', 'dist'],
  },
];
