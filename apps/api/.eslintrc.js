module.exports = {
  ...require('config/eslint-api'),
  // config/eslint-api lives in turborepo rootFolder/packages/config/eslint-api.js
  parserOptions: {
    root: true,
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
};
