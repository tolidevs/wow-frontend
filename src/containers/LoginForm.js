import React, { Component } from "react";
import {
  Button,
  Form,
  Segment,
  Grid,
  Header,
  Icon
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
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Grid
          textAlign="center"
        >
          <Grid.Column>
            <Header as="h1">
              Log In
            </Header>
            <br></br>
            <Form
              size="large"
              className="login-form"
              onSubmit={this.handleSubmit}
            >
              <Form.Input
                required
                size="big"
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
                size="big"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                onChange={this.handleChange}
              />
              <Button fluid size="huge" name="login" type="submit">
                Log In
              </Button>
            </Form>
            <NavLink className="secondary" to="/sign-up" exact>
              Sign Up
            </NavLink>
            <Grid.Row onClick={this.props.setMenu(false)}
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "1vh"
              }}>
              <NavLink to='/' exact >
                <Icon
                  name="arrow circle left"
                />
              Back to Search
            </NavLink>
            </Grid.Row>
          </Grid.Column>
        </Grid>
        {this.redirectToHome()}
      </Segment>
    );
  }
};

const mapStateToProps = ({ user, menu_on }) => {
  return {
    user,
    menu_on
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setMenu: menu_on => dispatch({ type: "SET_MENU", payload: { menu_on } })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)

