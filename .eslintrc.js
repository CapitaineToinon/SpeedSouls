module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
    "vue/no-unused-components": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-unused-vars": process.env.NODE_ENV === "production" ? "error" : "warn",
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
