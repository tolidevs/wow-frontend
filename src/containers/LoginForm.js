import React, { Component } from "react";
import {
  Button,
  Form,
  Segment,
  Grid,
  Header,
} from "semantic-ui-react";
import API from '../API';
import { NavLink, Redirect } from "react-router-dom";
import { connect } from 'react-redux'

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

  redirectToHome = () => {
    return this.props.user && <Redirect  to="/menu" exact />
  }

  handleSubmit = e => {
    e.preventDefault()

    API.logIn(this.state)
      .then(userObj => this.props.logIn(userObj.user, userObj.token, "existing_user"))
      .then(e.target.reset())
      .catch({ message: "Request failed" });
  };

  render() {
    return (
      <Segment
        basic
        style={{
          height: "90vh",
          display: "flex",
          alignItems: "center",
          width: "80vw"
        }}
      >
        <Grid
          textAlign="center"
        >
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Log In
            </Header>
            <Form
              size="large"
              className="login-form"
              onSubmit={this.handleSubmit}
            >
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
              <Button fluid size="large" name="login" type="submit">
                Login
              </Button>
            </Form>
            <NavLink to="/sign-up" exact>
              Sign Up
            </NavLink>
          </Grid.Column>
        </Grid>
        {this.redirectToHome()}
      </Segment>
    );
  }
};

const mapStateToProps = ({ user }) => {
  return {
    user
  }
}

export default connect(mapStateToProps)(LoginForm)

