module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    // In Express, some functions (such as those passed to `app.use(...)`) may
    // need unused variables to work properly. Otherwise, unused variables
    // should return an error.
    "no-unused-vars": ["error", { args: "none" }],
  },
};
