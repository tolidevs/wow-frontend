import React, { Component } from 'react';
import {
    Button,
    Form,
    Segment,
    Grid,
    Header,
    Icon
} from 'semantic-ui-react';
import API from '../API'
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

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
    return this.props.user && <Redirect  to='/menu' exact />;
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
      <Segment
        basic
        style={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Grid
          textAlign="center"

        >
          <Grid.Column style={{ maxWidth: "50vh" }}>
            <Header as="h1">
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
              <Button fluid size="huge" name="signup" type="submit">
                Sign Up
              </Button>
            </Form>
            <NavLink className="secondary" to="/login" exact>
              Log In
            </NavLink>
            <Grid.Row onClick={this.props.setMenu(false)}
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "1vh"
              }}>
              <NavLink to='/' exact>
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

const mapStateToProps = ({menu_on, user }) => {
  return {
    menu_on,
    user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setMenu: menu_on => dispatch({ type: "SET_MENU", payload: { menu_on } })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);

