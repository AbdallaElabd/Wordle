module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:react/recommended', 'standard', 'plugin:jest/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'space-before-function-paren': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],

    // Jest
    // 'jest/no-disabled-tests': 'warn',
    // 'jest/no-focused-tests': 'error',
    // 'jest/no-identical-title': 'error',
    // 'jest/prefer-to-have-length': 'warn',
    // 'jest/valid-expect': 'error',

    // React
    'react/react-in-jsx-scope': 'off'
  }
}
