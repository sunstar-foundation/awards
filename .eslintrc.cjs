module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: { react: { version: 'detect' } },
  rules: {
    'no-unused-vars': 'warn',
    'react/no-unescaped-entities': 'off',
  },
  ignorePatterns: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
};
