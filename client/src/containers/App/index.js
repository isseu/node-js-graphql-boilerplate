import React from 'react'
import { compose } from 'recompose'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import styles from './styles.css'

class App extends React.Component {
  render() {
    return (
      <div id="root">
        {this.props.children}
      </div>
    );
  }
}


export default compose(
  withRouter,
)(App);
