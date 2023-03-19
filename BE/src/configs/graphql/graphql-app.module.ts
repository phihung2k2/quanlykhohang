import { ApolloDriverConfig } from './../../../node_modules/@nestjs/apollo/dist/interfaces/apollo-driver-config.interface.d';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { formatError } from './exception/format-error';
import Keyv = require('keyv');
import { KeyvAdapter } from '@apollo/utils.keyvadapter';
const Redis = require('ioredis');

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/configs/graphql/schema.gql'),
      sortSchema: true,
      context: ({ req, res }) => ({ req, res }),
      formatError,
      persistedQueries: {
        ttl: 180,
      },
      playground: process.env.NODE_ENV === 'production' ? false : true,
      introspection: true,
      path: 'api/graphql',
    }),
  ],
  exports: [],
})
export class GraphQLAppModule { }
