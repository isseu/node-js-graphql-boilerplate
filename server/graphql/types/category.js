/* @flow */

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';
import InventoryType from './inventory';
import ProductType from './product';

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  description: 'A product category',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the category',
      resolve: (category) => category.get('id')
    },
    name: {
      type: GraphQLString,
      description: 'The name of the category',
      resolve: (category) => category.get('name')
    },
    inventory: {
      type: InventoryType,
      description: 'The inventory of the category',
      resolve: (category) => category.getInventory()
    },
    products: {
      type: new GraphQLList(ProductType),
      description: 'The products of the category',
      resolve: (category) => category.getProducts()
    },
    quantity: {
      type: GraphQLInt,
      description: 'The number of products in this category',
      resolve: (category) => category.getProducts().sum()
    },
  }),
});

export default CategoryType;
