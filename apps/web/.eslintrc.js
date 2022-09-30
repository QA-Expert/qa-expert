module.exports = {
  // custom-web lives in turborepo rootFolder/packages/eslint-config-custom-web
  ...require('config/eslint-web.js'),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
