import { CodegenConfig } from '@graphql-codegen/cli';
import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date';
const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/graphql',
  documents: ['./src/graphql/**/*'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
      config: {
        scalars: {
          DateTime: typeof Date.toString(),
        },
      },
    },
  },
  hooks: { afterAllFileWrite: ['eslint --fix', 'prettier --write'] },
  ignoreNoDocuments: true,
};

export default config;
