module.exports = {
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'prettier'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/script-setup-uses-vars': 'off',
  },
};
