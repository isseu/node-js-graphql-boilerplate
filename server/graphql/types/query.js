import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt
} from 'graphql';
import ViewerType from './viewer';
import db from '../database';

import { User, Product, Category, Inventory } from '../database';

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    viewer: {
      type: ViewerType,
      args: { 
        userId: { type: GraphQLString },
        token: { type: GraphQLString }
      },
      resolve: (_, { userId, token }, context) => {
        context = {};
        context.user = User.authByToken(userId, token);
        console.dir(context.user)
        return context.user ;
      },
    },
  })
});

export default QueryType;
