import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';

require('dotenv').config();

import graphQLSchema from './graphql';

const PORT = 3000
var app = express();

app.use('/graphql', bodyParser.json(),
  graphqlExpress({
    schema: graphQLSchema
  })
);

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.listen(PORT, () => {
  console.log(`GraphQL server running on port ${PORT}.`)
});