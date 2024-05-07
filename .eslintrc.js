module.exports = {
    env: {
      browser: true,
      es6: true,
    },
    extends: ['eslint:recommended',
        "prettier"
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: false,
      },
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
};