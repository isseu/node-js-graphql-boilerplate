import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

import UserType from './user';

const SignInPayloadType = new GraphQLObjectType({
  name: 'SignInPayloadType',
  description: 'A person who uses our app',
  fields: () => ({
    user: {
      type: UserType,
      description: 'The user information',
      resolve: (payload) => payload.user
    },
    token: {
      type: GraphQLString,
      description: 'The token of the logged user',
      resolve: (payload) => payload.token
    },
  }),
});

export default SignInPayloadType;
