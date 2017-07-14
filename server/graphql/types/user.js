import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of the user',
      resolve: (user) => user.get('id')
    },
    email: {
      type: GraphQLString,
      description: 'The email of the user',
      resolve: (user) => user.get('email')
    },
    token: {
      type: GraphQLString,
      description: 'The email of the user',
      resolve: (user) => user.get('token')
    },
  }),
});

export default UserType;
