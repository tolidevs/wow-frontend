import React, { Component } from "react";
import {
  Button,
  Form,
  Segment,
  Grid,
  Header,
  Icon,
  Message
} from "semantic-ui-react";
import API from '../API';
import { NavLink, Redirect } from "react-router-dom";
import { connect } from 'react-redux'

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    errorMsg: this.props.errorMsg
  }

  setErrorMsg = (errorMsg) => {
    this.setState({
      errorMsg
    })
  }

  validateEmail = (e) => {
    const input = e.target.value

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
      this.setErrorMsg(false)
      return false
    }
    this.setErrorMsg("Please enter a valid email address")
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

    const { email, password } = this.state

    API.logIn(email, password)
      .then(userObj => this.props.logIn(userObj.user, userObj.token, "existing_user", userObj.message, ))
      .then(e.target.reset())
      .catch(console.log("Failed to fetch"))
  };

  render() {
    const {errorMsg} = this.state

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
                icon="at"
                iconPosition="left"
                placeholder="Email"
                name="email"
                onChange={(e) => {
                  // run front end validations on email format
                  this.validateEmail(e)
                  this.handleChange(e)
                }}
              />
              <Form.Input
               required
                size="big"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                onChange={this.handleChange}
              />
              {errorMsg && <Message>{errorMsg}</Message>}
              <Button
                fluid
                size="huge" name="login" type="submit">
                Log In
              </Button>
            </Form>
            <NavLink
              onClick={() =>this.setErrorMsg(false)}
              className="secondary"
              to="/sign-up"
              exact
            >
              Sign Up
            </NavLink>
            <Grid.Row onClick={this.props.setMenu(false)}
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "1vh"
              }}>
              {/* this doesn't work!! check this! */}
              {this.props.search_results ? (
                <NavLink to='/results' exact>
                  <Icon
                    name="arrow circle left"
                  />
                  Back to Search
                </NavLink>
              ) : (<NavLink to='/' exact>
                <Icon
                  name="arrow circle left"
                />
              Back to Search
            </NavLink>
            )}
            </Grid.Row>
          </Grid.Column>
        </Grid>
        {this.redirectToHome()}
      </Segment>
    );
  }
};

const mapStateToProps = ({ user, menu_on, search_results }) => {
  return {
    user,
    menu_on,
    search_results
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setMenu: menu_on => dispatch({ type: "SET_MENU", payload: { menu_on } })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)

