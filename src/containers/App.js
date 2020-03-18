import React, { Component } from "react";
import Navbar from '../components/Navbar'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../App.css';
import { Container } from 'semantic-ui-react';
import { connect } from "react-redux";

import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import UserMenu from './UserMenu'
import Home from './Home'
import Results from './Results'
import ShowPage from './ShowPage'
import API from "../API"
import SavedShows from './SavedShows'


class App extends Component {

  logIn = (user, token, user_type) => {
    this.props.setUser(user)
    localStorage.token = token
    this.props.setUserType(user_type)
    this.getAndSetSavedShows(user.id)
  }

  getAndSetSavedShows = (user_id) => {
    API.getSavedShows(user_id)
    .then( shows => this.props.setSavedShows(shows))
  }

  logOut = () => {
    this.props.setUser(null);
    localStorage.token = null;
    this.props.setUserType(null);
    this.props.setSavedShows([])
  }

  saveShow = (imdbID, title, type, year, poster) => {
    API.saveShow(this.props.user.id, imdbID, title, type, year, poster)
      .then(saved_show => this.props.setSavedShows([...this.props.saved_shows, saved_show]));
  };

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

        <Container
          className="main-container"
          // style={}
        >
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/login"
            component={() => <LoginForm logIn={this.logIn} />}
          />
          <Route
            exact
            path="/sign-up"
            component={() => <SignUpForm logIn={this.logIn} />}
          />
          <Route
            exact
            path="/menu"
            component={() => <UserMenu logOut={this.logOut} />}
          />
          <Route exact path="/results" component={() => <Results saveShow={this.saveShow} />} />
          <Route exact path="/results/show" component={() => <ShowPage />} />
          <Route exact path="/menu/saved-shows" component={() => <SavedShows />} />
        </Container>
      </Router>
    );
  }
}

const mapStateToProps = ({ user, user_type, saved_shows }) => {
  return {
    user,
    user_type,
    saved_shows
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch({ type: "SET_USER", payload: { user } }),
    setUserType: user_type => dispatch({ type: "SET_USER_TYPE", payload: { user_type } }),
    setSavedShows: saved_shows => dispatch({ type: 'SET_SAVED_SHOWS', payload: { saved_shows } })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

