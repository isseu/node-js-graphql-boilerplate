import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styles from './styles.css';
import { Grid } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component {
  render() {
    const { data } = this.props;
    console.dir(this);
    if (data.loading) {
      return <p>Loading...</p>;
    } else if (data.error) {
      return <p>Error!</p>;
    } else {
      return (
      <div>
        <ul>
          {data.viewer.inventories.map((inventory) => (<li key={inventory.id}><Link to={"/dashboard/inventory/" + inventory.id}>{inventory.name}</Link></li>))}
        </ul>
        {this.props.children}
      </div>
      );
    }
  }
}

export default graphql(
  gql`
{
  viewer(userId: "1", token: "cf75dd94b803e4f44046") {
    id,
    email,
    inventories {
      id,
      name
      categories {
        name
      }
    }
  }
}`,
)(Dashboard);
