module.exports = {
  ...require('config/eslint-api'),
  // custom-api lives in turborepo rootFolder/packages/eslint-config-custom-api
  parserOptions: {
    root: true,
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
};
