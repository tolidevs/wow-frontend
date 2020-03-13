import React, { Component } from "react";
import {
  Button,
  Form,
  Segment,
  Grid,
  Header,
} from "semantic-ui-react";
import API from '../API'

class LoginForm extends Component {
  state = {
    email: "",
    password: ""
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    API.logIn(this.state)
      .then(userObj => this.props.logIn(userObj.user , userObj.token))
      .then(e.target.reset())
      .catch({ message: "Request failed" });
  };

  render() {
    return (
      <Segment stacked>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: "50vh" }}>
            <Header as="h2" textAlign="center">
              Log In
            </Header>
            <Form size="large" className="login-form" onSubmit={this.handleSubmit}>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Email"
                name="email"
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                onChange={this.handleChange}
              />
              <Button fluid size="large" name="login" type="submit">
                Login
              </Button>
            </Form>
              <a href="./sign-up">Sign Up</a>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
};

export default LoginForm;




{/* <Form
  className="login-form"
  onSubmit={e => {
    loginFunction(
      e,
      e.target.email.value,
      e.target.password.value,
      document.activeElement
    );
  }}
>
  <Form.Group widths={2}>
    <Form.Input
      name="email"
      label="Email"
      placeholder="Email Address"
      type="email"
      required
    />
    <Form.Input
      name="password"
      label="Password"
      placeholder="Password"
      type="password"
      required
    />
  </Form.Group>

  <Button name="login" type="submit" onClick={displayLogin}>
    Login
  </Button>
  <Button name="create" type="submit" onClick={displayLogin} secondary>
    Sign Up
  </Button>
</Form>; */}