import React, { Component } from 'react';
import {
    Button,
    Form,
    Segment,
    Grid,
    Header,
} from 'semantic-ui-react';
import API from '../API'
import { NavLink, Redirect } from 'react-router-dom';

class SignUpForm extends Component {
  state = {
    user_name: "",
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  redirectToHome = () => {
    return this.props.user && <Redirect to='/menu' exact />;
  };

  handleSubmit = e => {
    e.preventDefault();

    const { user_name, email, password } = this.state;
    API.signUp({
      name: user_name,
      email,
      password
    })
      .then(userObj =>
        this.props.logIn(userObj.user, userObj.token, "new_user")
      )
      .then(e.target.reset())
      .catch({ message: "Request failed" });
  };

  render() {
    return (
      <Segment>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: "50vh" }}>
            <Header as="h2" textAlign="center">
              Sign Up
            </Header>
            <Form
              size="large"
              className="login-form"
              onSubmit={this.handleSubmit}
            >
              <Form.Input
                required
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Name"
                name="user_name"
                onChange={this.handleChange}
              />
              <Form.Input
                required
                fluid
                icon="at"
                iconPosition="left"
                placeholder="Email"
                name="email"
                onChange={this.handleChange}
              />
              <Form.Input
                required
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                onChange={this.handleChange}
              />
              <Button fluid size="large" name="signup" type="submit">
                Sign Up
              </Button>
            </Form>
            <NavLink to="/login" exact>
              Log In
            </NavLink>
          </Grid.Column>
        </Grid>
        {this.redirectToHome()}
      </Segment>
    );
  }
};

export default SignUpForm;

