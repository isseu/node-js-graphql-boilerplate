/* @flow */

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt
} from 'graphql';

import CategoryType from './category';

const InventoryType = new GraphQLObjectType({
  name: 'Inventory',
  description: 'A inventory',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the inventory',
      resolve: (inventory) => inventory.get('id')
    },
    name: {
      type: GraphQLString,
      description: 'The name of the inventory',
      resolve: (inventory) => inventory.get('name')
    },
    categories: {
      type: new GraphQLList(CategoryType),
      args: { inventoryId: { type: GraphQLString } },
      resolve: (inventory, { inventoryId }, context) => inventory.getCategories(),
    },
  }),
});

export default InventoryType;
