module.exports = {
  // config/eslint-web lives in turborepo rootFolder/packages/config/eslint-web.js
  ...require('config/eslint-web.js'),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
