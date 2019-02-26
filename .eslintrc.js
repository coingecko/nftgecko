module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersoin: 2018,
    sourceType: "module"
  },

  env: {
    browser: true,
    jest: true,
    node: true
  },

  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: [
    "plugin:vue/strongly-recommended",
    "@vue/prettier",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "@vue/eslint-config-typescript"
  ],

  // required to lint *.vue files
  plugins: ["vue"],

  globals: {
    ga: true, // Google Analytics
    cordova: true,
    __statics: true,
    process: true
  },

  // add your custom rules here
  rules: {
    "no-unused-vars": [
      "error",
      { vars: "all", args: "none", ignoreRestSiblings: false }
    ],
    "prefer-promise-reject-errors": "off",
    // allow console.log during development only
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    // allow debugger during development only
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",

    "vue/html-closing-bracket-spacing": [
      "warn",
      {
        startTag: "never",
        endTag: "never",
        selfClosingTag: "always"
      }
    ],

    "no-unused-vars": "off",

    "@typescript-eslint/no-explicit-any": false,
    "@typescript-eslint/no-unused-vars": false,
    "@typescript-eslint/explicit-function-return-type": false,
    "@typescript-eslint/no-non-null-assertion": false,
    "@typescript-eslint/camelcase": false
  }
};
