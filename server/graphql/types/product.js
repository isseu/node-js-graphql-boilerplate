/* @flow */

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';
import CategoryType from './category';
import db from '../database';

const ProductType = new GraphQLObjectType({
  name: 'Product',
  description: 'A product from the inventary',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the product',
      resolve: (product) => product.get('id')
    },
    code: {
      type: GraphQLString,
      description: 'The code of the product',
      resolve: (product) => product.get('code')
    },
    name: {
      type: GraphQLString,
      description: 'The name of the product',
      resolve: (product) => product.get('name')
    },
    description: {
      type: GraphQLString,
      description: 'The description of the product',
      resolve: (product) => product.get('description')
    },
    category: {
      type: CategoryType,
      description: 'The category of the product',
      resolve: (product) => product.getCategory()
    },
  }),
});

export default ProductType;
