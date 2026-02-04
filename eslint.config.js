import js from "@eslint/js"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"
import prettier from "eslint-config-prettier"

export default [
  {
    ignores: ["dist", ".eslintrc.cjs"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // 👈 ESSENCIAL
        },
      },
      globals: {
        ...globals.browser,
      },
    },

    settings: {
      react: {
        version: "18.2",
      },
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },

    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      ...prettier.rules,

      "react/jsx-no-target-blank": "off",
      "react/prop-types": "off",

      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
]
