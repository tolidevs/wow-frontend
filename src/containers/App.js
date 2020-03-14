import React, { Component } from "react";
import Navbar from '../components/Navbar'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../App.css';
import { Container } from 'semantic-ui-react';
import { connect } from "react-redux";

import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import UserMenu from '../components/UserMenu';
import Home from './Home'
// import MenuContainer from "./MenuContainer";
import API from "../API";


class App extends Component {

  state = {
    user: null
  }

  logIn = (user, token) => {
    // this.setState({
    //   user
    // })
    this.props.setUser(user)
    localStorage.token = token
  }

  componentDidMount() {
    if (localStorage.token) {
      API.validateProfile(localStorage.token)
        .then(userObj =>
          this.logIn(userObj.user, userObj.token)
      )
      // console.log(localStorage.token)
    }
  }

  render() {
    const { user } = this.state
    return (
      <Router>
        <Navbar loggedIn={!!user} />
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
          <Route exact path="/options" component={() => <UserMenu />} />

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
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch({ type: "SET_USER", payload: { user }})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

