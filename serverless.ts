import type { AWS } from '@serverless/typescript';

import {post_data} from './src/functions';
import {get_data} from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'serveless-and-dynamodb-queries',
  frameworkVersion: '2',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dynamodb-local'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { post_data, get_data },
  package: { individually: true },
  custom: {
    dynamodb: {
      stages: ['dev'],
      start: {
        port: 8000,
        migrate: true,
        seed: true
      }
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      mediaTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "Media-Table",
          AttributeDefinitions: [
            {AttributeName: "actor", AttributeType: "S"},
            {AttributeName: "movie", AttributeType: "S"},
            {AttributeName: "genre", AttributeType: "S"},
            {AttributeName: "year", AttributeType: "S"}
          ],
          KeySchema: [
            {AttributeName: "actor", KeyType: "HASH"},
            {AttributeName: "movie", KeyType: "RANGE"}
          ],
          GlobalSecondaryIndexes: [
            {
              IndexName: "GenreYearIndex",
              KeySchema: [
                {AttributeName: "genre", KeyType: "HASH"},
                {AttributeName: "year", KeyType: "RANGE"}
              ],
              Projection: { 
                ProjectionType: "ALL",
              },
            },
          ],
          LocalSecondaryIndexes: [
            {
              IndexName: "YearIndex",
              KeySchema: [
                {AttributeName: "actor", KeyType: "HASH"},
                {AttributeName: "year", KeyType: "RANGE"}
              ],
              Projection: {
                ProjectionType: "ALL",
              },
            },
          ],
          BillingMode: "PAY_PER_REQUEST"
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;