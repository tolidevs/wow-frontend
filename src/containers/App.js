import React, { Component } from "react";
import Navbar from '../components/Navbar'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../App.css';
import { Container } from 'semantic-ui-react';
import { connect } from "react-redux";

import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import UserMenu from './UserMenu';
import Home from './Home'
// import MenuContainer from "./MenuContainer";
import API from "../API";


class App extends Component {

  logIn = (user, token, user_type) => {
    this.props.setUser(user)
    localStorage.token = token
    this.props.setUserType(user_type)
  }

  logOut = () => {
    this.props.setUser(null);
    localStorage.token = null;
    this.props.setUserType(null);
  }

  componentDidMount() {
    if (localStorage.token) {
      API.validateProfile(localStorage.token)
        .then(userObj =>
          this.logIn(userObj.user, userObj.token, "existing_user")
      )
      // console.log(localStorage.token)
    }
  }

  render() {
    return (
      <Router>
        <Navbar />
        {}
        <Container>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/login"
            component={() => <LoginForm logIn={this.logIn} />}
          />
          <Route
            exact path="/sign-up"
            component={() => <SignUpForm logIn={this.logIn} />}
          />
          <Route exact path="/menu" component={() => <UserMenu logOut={this.logOut} />} />

          {/* <Route
            exact
            path="/menu"
            component={() => <MenuContainer logIn={this.logIn} />}
          /> */}
        </Container>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    user_type: state.user_type
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch({ type: "SET_USER", payload: { user } }),
    setUserType: user_type => dispatch({ type: "SET_USER_TYPE", payload: { user_type }})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

