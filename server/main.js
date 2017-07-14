import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import jwt from 'jsonwebtoken';

require('dotenv').config();

import graphQLSchema from './graphql';

const PORT = process.env.SERVER_PORT || 3003;
var app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    console.dir(token)
    // verifies secret and checks exp
    jwt.verify(token, 'SECRET CAT KEY', (err, decoded) => {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
      }
    });
  }
  next();
});

app.use('/graphql',
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