/* @flow */
import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import UserType from './user';
import SignInPayloadType from './sign_in_payload';
import { user } from '../../models';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
  	createUser: {
      type: UserType,
      args: { email: { type: GraphQLString }, password: { type: GraphQLString } },
      resolve: (_, { email, password }, context) => user.createUser({ email, password }, context)
    },
    loginUser: {
      type: SignInPayloadType,
      args: { email: { type: GraphQLString }, password: { type: GraphQLString } },
      resolve: (_, { email, password }, context) => {
        return user.authorization(email, password);
      }
    }
  })
});

export default MutationType;
