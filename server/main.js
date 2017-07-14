import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import passport from "passport";
import session from "express-session";
import "./auth.js";

require('dotenv').config();

import graphQLSchema from './graphql';

const PORT = process.env.SERVER_PORT;
var app = express();

app.use(session({
  secret: process.env.SESSION_SECRET
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/graphql', bodyParser.json(),
  graphqlExpress({
    schema: graphQLSchema
  })
);

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.listen(PORT, () => {
  console.log(`GraphQL server running on port ${PORT}.`);
});