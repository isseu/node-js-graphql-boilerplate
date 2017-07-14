import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import ViewerType from './viewer';
import { User } from '../../models';

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
        console.dir(context.user);
        return context.user ;
      },
    },
  })
});

export default QueryType;
