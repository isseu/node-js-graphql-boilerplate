import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

const ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  description: 'The viewer who uses our app',
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
      description: 'The token of the user',
      resolve: (user) => user.get('token')
    }
    // inventories: {
    //   type: new GraphQLList(InventoryType),
    //   resolve: (user, _, context) => user.getInventories(),
    // },
    // product: {
    //   type: ProductType,
    //   args: { id: { type: GraphQLString } },
    //   resolve: (user, { id }, context) => db.getProduct(id, context),
    // },
    // category: {
    //   type: CategoryType,
    //   args: { id: { type: GraphQLString } },
    //   resolve: (user, { id }, context) => db.getCategory(id, context),
    // }
  }),
});

export default ViewerType;
