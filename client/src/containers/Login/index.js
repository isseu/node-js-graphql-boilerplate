import React from 'react';
import { gql, graphql } from 'react-apollo';
import styles from './styles.css';
import { Navbar, NavItem, Nav, Jumbotron, Button, Grid, Row, Image, Col, Form, FormGroup, ControlLabel, FormControl, Checkbox } from 'react-bootstrap';

class Login extends React.Component {
  render() {
    return (
        <Grid className="container-login">
          <Col xs={6}>
            <Row className="login-title">
              <Image src="logo.png" />
              <h1>Welcome</h1>
            </Row>
            <Row>
              <Form horizontal>
                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    Email
                  </Col>
                  <Col sm={10}>
                    <FormControl type="email" placeholder="Email" />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    Password
                  </Col>
                  <Col sm={10}>
                    <FormControl type="password" placeholder="Password" />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Checkbox>Remember me</Checkbox>
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Button type="submit">
                      Sign in
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </Row>
          </Col>
        </Grid>
    )
  }
}

export default Login
