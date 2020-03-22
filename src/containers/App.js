import React, { Component } from "react";
import Navbar from '../components/Navbar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import '../App.css';
import { connect } from "react-redux";
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import UserMenu from './UserMenu'
import Home from './Home'
import Results from './Results'
import ShowPage from './ShowPage'
import API from "../API"
import SavedShows from './SavedShows'
import NotFound from '../components/NotFound'
const history = createHistory();

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


  componentDidMount() {
    if (localStorage.token) {
      API.validateProfile(localStorage.token)
        .then(userObj =>
          this.logIn(userObj.user, userObj.token, "existing_user")
      )
    }
  }

  render() {
    return (
      <Router history={history}>
        <Navbar history={history} />

        <div
          className="main-container"
        >
          <Switch>
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
              component={() => (
                <UserMenu logOut={this.logOut} history={history} />
              )}
            />
            <Route
              exact
              path="/results"
              component={() => (
                <Results history={history} />
              )}
            />
            <Route
              exact
              path="/results/show"
              component={() => (
                <ShowPage history={history} />
              )}
            />
            <Route
              exact
              path="/user/watch-list"
              component={() =>
                <SavedShows history={history}
                />}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ user, user_type}) => {
  return {
    user,
    user_type
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

