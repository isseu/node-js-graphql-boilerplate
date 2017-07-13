import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import {
  BrowserRouter as Router,
  Route, Switch, Redirect
} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

// Global Styles
import './index.css';

// Containers
import App from './containers/App'
import Dashboard from './containers/Dashboard'
import Login from './containers/Login'
import Front from './containers/Front'

if (!process.env.REACT_APP_GRAPHQL_ENDPOINT) {
  throw new Error('REACT_APP_GRAPHQL_ENDPOINT is not defined')
}
const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  }),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App>
      {(false) ? ( // if login
          <Switch>
            <Route
              path='/'
              component={Front}
            />
            <Route
              path='/login'
              component={Login}
            />
          </Switch>
      ) : (
        <Switch>
          <Route exact path='/' render={() => ( <Redirect to='/dashboard'/> )} />
          <Route
            path='/dashboard'
            component={() => (
            <Dashboard>
              <Switch>
                <Route
                  path='/'
                  component={() => (<p>inicio dashboard</p>)}
                />
                <Route
                  path='/inventories/:id'
                  component={() => (<p>inventario seleccionado</p>)}
                />
              </Switch>
            </Dashboard>
          )}
          />
        </Switch>
      )}
      </App>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
)
registerServiceWorker();
