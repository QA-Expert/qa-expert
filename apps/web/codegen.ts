import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // NOTE: codegen.ts supports dotenv variables but they should live in .evn file
  // https://the-guild.dev/graphql/codegen/docs/config-reference/require-field#dotenv-integration
  schema: process.env.NEXT_PUBLIC_API_URL,
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
          // NOTE: hack to be able to type Date type. Graphql returns string for Date in request.
          // So to be able to type it as string i have to do this hack
          DateTime: typeof '',
        },
      },
    },
  },
  hooks: { afterAllFileWrite: ['eslint --fix', 'prettier --write'] },
  ignoreNoDocuments: true,
};

export default config;
