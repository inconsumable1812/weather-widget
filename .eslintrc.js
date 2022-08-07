module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended',
    'eslint:recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    semi: ['off', { omitLastInOneLineBlock: 'never' }],
    camelcase: ['off', { properties: 'never' }],
    'space-before-function-paren': 'off',
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['Main']
      }
    ]
  }
};
