module.exports = {
  extends: [
    'plugin:react/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'check-file', 'react-hooks'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    // 'check-file/folder-naming-convention': [
    //   'error',
    //   {
    //     'components/**': 'CAMEL_CASE'
    //   }
    // ],
    'react/prop-types': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'react-hooks/exhaustive-deps': 'error',
    '@typescript-eslint/no-explicit-any': 'off'
  }
};
