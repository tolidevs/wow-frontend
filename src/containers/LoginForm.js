import React, { Component } from "react";
import {
  Button,
  Form,
  Segment,
  Grid,
  Header,
} from "semantic-ui-react";

class LoginForm extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault()
    console.log(this.state); 
    // Send the data from the form to the server in order to authenticate the user
    // API.signIn(this.state)
    //   // The server then responds with the username and a token generated from the user's id to confirm we've been authenticated successfully. We then use the signIn function passed down in props to set the state of username in App to be the username we've been sent back and store the token we've been sent back in localStorage
    //   .then(json => this.props.signIn(json.username, json.token));
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