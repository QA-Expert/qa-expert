# What's inside?

This turborepo uses [npm](https://www.npmjs.com/) as a package manager. It includes the following packages/apps:

## Apps and Packages

`apps:`

- `web`: Web Project based on [Next.js](https://nextjs.org)
- `api`: API Project based on Nest

`packages:`

- `config` - shared eslint configs for apps
- `tsconfig` - these are base shared `tsconfig.json`s from which all other `tsconfig.json`'s inherit from.

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

# Installation

Install [Nodejs 20.x](https://nodejs.org/en/download/)

Install yarn

```
npm install --global yarn
```

Install all projects dependencies

```
yarn install
```

Install [husky](https://typicode.github.io/husky/#/?id=usage)

```
npx husky install
```

install [MongoDB](https://www.mongodb.com/docs/manual/administration/install-community/)

# Build

To build all apps and packages, run the following command:

```
cd <current repo>
yarn build
```

# Develop

To develop all apps and packages, run the following command:

```
cd <current repo>
yarn dev
```

To be able to run/build/test apps separately use `--filter=<app name>`

```
cd <current repo>
yarn dev --filter=api
```

API will be run on `localhost:3001/graphql`

```
cd <current repo>
yarn dev --filter=web
```

Web will be run on `localhost:3000`

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd <current repo>
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/core-concepts/pipelines)
- [Caching](https://turborepo.org/docs/core-concepts/caching)
- [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/core-concepts/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
