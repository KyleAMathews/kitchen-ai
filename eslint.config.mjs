import prettier from "eslint-plugin-prettier"
import globals from "globals"
import tsParser from "@typescript-eslint/parser"
import path from "node:path"
import { fileURLToPath } from "node:url"
import js from "@eslint/js"
import { FlatCompat } from "@eslint/eslintrc"
import importPlugin from "eslint-plugin-import"
import reactRefresh from "eslint-plugin-react-refresh"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: [
      `**/node_modules/**/*`,
      `**/dist/**/*`,
      `**/tsup.config.ts`,
      `**/vitest.config.ts`,
      `**/database.d.ts`,
      `**/sst-env.d.ts`,
      `**/.sst/**/*`,
      `**/routeTree.gen.ts`,
    ],
  },
  ...compat.extends(
    `eslint:recommended`,
    `plugin:@typescript-eslint/recommended`,
    `plugin:react-hooks/recommended`,
    `plugin:prettier/recommended`
  ),
  {
    plugins: {
      prettier,
      import: importPlugin,
      "react-refresh": reactRefresh,
    },
    settings: {
      "import/resolver": {
        typescript: {},
      },
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: `module`,

      parserOptions: {
        requireConfigFile: false,

        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    rules: {
      quotes: [`error`, `backtick`],
      "no-unused-vars": `off`,
      "@typescript-eslint/triple-slash-reference": `off`,
      "import/no-unresolved": `error`,
      "@typescript-eslint/no-unused-vars": [
        `error`,
        {
          argsIgnorePattern: `^_`,
          varsIgnorePattern: `^_`,
          caughtErrorsIgnorePattern: `^_`,
        },
      ],
      "react-refresh/only-export-components": [
        `warn`,
        { allowConstantExport: true },
      ],
    },
  },
]
