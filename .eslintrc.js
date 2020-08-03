module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    'no-console': 2,
    'no-debugger': 2,
    // 语句强制分号结尾
    semi: [2, 'always'],
    'handle-callback-err': 0,
    eqeqeq: ['error', 'smart'],
    'one-var': 'off',
    camelcase: 0,
    'no-var': 2,
    // 优先使用数组和对象解构
    'prefer-destructuring': 0,
    'no-duplicate-imports': 2,
    'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
    'vue/html-quotes': ['error', 'double'],
    'prefer-const': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
