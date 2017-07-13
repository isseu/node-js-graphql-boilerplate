import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Navbar, NavItem, Nav, Jumbotron, Button, Grid, Row, Image, Col } from 'react-bootstrap';
import styles from './styles.css';

class Front extends React.Component {
  render() {
    return (
  <div>
    <div className="introduction">
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="">Consus</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavItem eventKey={1} href="#">Link</NavItem>
          <NavItem eventKey={2} href="#">
            <Button bsStyle="info" bsSize="small">Sign up</Button>
          </NavItem>
        </Nav>
      </Navbar>
      <Grid style={{ textAlign: 'center' }}>
        <Row>
          <Col xs={8} xsOffset={2} className="introduction-text">
            <h1>Easily manage and forecast your inventory</h1>
            <p>Inventory management made simple and easy. Analize and forecast your items without dificulties.</p>
          </Col>
        </Row>
        <Row>
          <Button style={{ marginTop: 30 }} bsStyle="info" bsSize="large">Sign Up</Button>
        </Row>
        <Row>
          <Col xs={8} xsOffset={2}>
            <Image style={{ marginTop: 30 }} src="https://www.juro.io/landing/public/images/screenshot1.png" responsive/>
          </Col>
        </Row>
      </Grid>
    </div>
    <Grid className="banner">
        <Row>
          <Col xs={6} xsOffset={1}>
            <Row>
              <h1>5800</h1><h3>Loren Ipsum</h3>
            </Row>
            <Row>
              <h2>Loren Ipsum</h2>
            </Row>
          </Col>
          <Col xs={3} xsOffset={0}>
            <Image src="https://www.juro.io/landing/public/images/slider-1-image.png" responsive />
          </Col>
        </Row>
    </Grid>
    <div className="footer">
      <Grid>
        <Row>
          <Col xs={4}>
            <p><strong>Consus</strong></p>
            <ul className="list-unstyled">
              <li>© Consus 2017</li>
              <li>All rights reserved</li>
              <li>Santiago - Chile</li>
            </ul>
          </Col>
          <Col xs={4}>
            <p><strong>About</strong></p>
            <ul className="list-unstyled">
              <li><a href="">FAQ</a></li>
              <li><a href="">Contact us</a></li>
            </ul>
          </Col>
          <Col xs={4}>
            <p><strong>Social</strong></p>
            <ul className="list-unstyled">
              <li><a href="">Facebook</a></li>
              <li><a href="">Twitter</a></li>
              <li><a href="">Reddit</a></li>
            </ul>
          </Col>
        </Row>
      </Grid>
    </div>
  </div>
    )
  }
}


export default compose(
  withRouter,
)(Front)
