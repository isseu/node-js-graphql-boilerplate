/* @flow */
import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt
} from 'graphql';
import UserType from './user';
import db from '../database';

import { User, Product, Category, Inventory } from '../database';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
  	createUser: {
      type: UserType,
      args: { email: { type: GraphQLString }, password: { type: GraphQLString } },
      resolve: (_, { email, password }, context) => db.createUser({ email, password }, context)
    },
    loginUser: {
      type: UserType,
      args: { email: { type: GraphQLString }, password: { type: GraphQLString } },
      resolve: (_, { email, password }, context) => {
        return User.authorization(email, password);
      }
    }
  })
});

export default MutationType;
