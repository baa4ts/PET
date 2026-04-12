import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import perfectionist from 'eslint-plugin-perfectionist'
import unicorn from 'eslint-plugin-unicorn'
import promise from 'eslint-plugin-promise'
import unusedImports from 'eslint-plugin-unused-imports'
import sonarjs from 'eslint-plugin-sonarjs'
import noSecrets from 'eslint-plugin-no-secrets'

export default defineConfig([
  globalIgnores(['dist', 'src/components/ui']),
  {
    files: ['**/src/**/*.{ts,tsx}'],
    plugins: {
      'simple-import-sort': simpleImportSort,
      'no-secrets': noSecrets,
      'unused-imports': unusedImports,
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      perfectionist.configs['recommended-natural'],
      unicorn.configs.recommended,
      promise.configs['flat/recommended'],
      sonarjs.configs.recommended,
    ],
    rules: {
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      'no-secrets/no-secrets': 'warn',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/filename-case': 'off',
      'perfectionist/sort-objects': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': 'warn',
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])