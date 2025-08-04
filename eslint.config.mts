import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";

export default [
  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.es2021,
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      prettier: eslintPluginPrettier,
    },

    rules: {
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      "no-caller": "error",
      "no-extend-native": "error",
      "no-proto": "error",
      "use-isnan": "error",
      "valid-typeof": "error",

      "no-undef": "error",
      "no-unused-vars": "error",
      "no-redeclare": "error",
      "no-self-compare": "error",
      "no-unreachable": "error",
      "no-duplicate-imports": "error",
      "consistent-return": "error",

      "no-var": "error",
      "prefer-const": "error",
      "prefer-template": "error",
      "object-shorthand": "error",
      "prefer-arrow-callback": "error",

      eqeqeq: ["error", "always"],
      "no-throw-literal": "error",
      "no-return-assign": "error",
      "array-callback-return": "error",
      "no-useless-constructor": "error",
      "no-useless-rename": "error",

      "prettier/prettier": [
        "error",
        {
          printWidth: 80,
          tabWidth: 3,
          singleQuote: true,
          trailingComma: "all",
          arrowParens: "always",
          semi: false,
          endOfLine: "lf",
        },
      ],

      quotes: "off",
      semi: ["error", "never"],
      "comma-dangle": "off",
      indent: "off",
      "max-len": "off",
    },
  },

  {
    files: ["**/*.{ts,tsx}"],
    rules: {  
      "no-undef": "off",
      "no-unused-vars": "off",
      "no-redeclare": "off",
      "no-use-before-define": "off",

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-redeclare": "error",
      "@typescript-eslint/no-use-before-define": [
        "error",
        {
          functions: false,
          classes: true,
          variables: true,
          typedefs: true,
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "prefer-template": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
    },
  },

  eslintConfigPrettier,

  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "*.min.js",
      ".next/**",
      ".nuxt/**",
      "**/*.d.ts",
    ],
  },
];
