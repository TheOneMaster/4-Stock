
import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv'

dotenv.config();

const config: CodegenConfig = {
  overwrite: true,
  schema: [{
    "https://api.start.gg/gql/alpha": {
      headers: {
        "Authorization": `Bearer ${process.env['API_TOKEN']}`
      }
    }
  }],
  documents: "./src/**/*.graphql",
  config: {
    strict: true
  },
  generates: {
    "src/gql/gql.ts": {
      overwrite: true,
      plugins: ["typescript", "typescript-operations", "typescript-react-query", {
        add: {
          content: "//  THIS IS A GENERATED FILE. DO NOT EDIT."
        }
      }],
      config: {
        fetcher: "../fetchAPI#fetchData",
        avoidOptionals: true,
        exposeQueryKeys: true,
        strict: true
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
