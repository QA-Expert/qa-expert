import { CodegenConfig } from '@graphql-codegen/cli';
const config: CodegenConfig = {
  // TODO: figure out why NEXT_PUBLIC_API_URL is undefined: I think it is because it is in root level
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
          //TODO: hack to be able to type Date type
          DateTime: typeof '',
        },
      },
    },
  },
  hooks: { afterAllFileWrite: ['eslint --fix', 'prettier --write'] },
  ignoreNoDocuments: true,
};

export default config;
