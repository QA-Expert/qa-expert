import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/graphql',
  documents: ['src/graphql/*'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  hooks: { afterAllFileWrite: ['eslint --fix', 'prettier --write'] },
  ignoreNoDocuments: true,
};

export default config;
