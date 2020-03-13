import React, { Component } from "react";
import Navbar from '../components/Navbar'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../App.css';
import { Container } from 'semantic-ui-react';
import LoginForm from './LoginForm'
import UserMenu from '../components/UserMenu';

import Home from './Home'
import MenuContainer from "./MenuContainer";
import API from "../API";


class App extends Component {

  state = {
    user: null
  }

  logIn = (user, token) => {
    this.setState({
      user
    })
    localStorage.token = token
  }

  componentDidMount() {
    if (localStorage.token) {
      API.validateProfile(localStorage.token)
        .then(userObj =>
          this.logIn(userObj.user, userObj.token)
      )
      console.log(localStorage.token)
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
          {/* <Route exact path="/sign-up" component={SignUp} /> */}
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

export default App;

