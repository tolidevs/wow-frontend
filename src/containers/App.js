import React, { Component } from "react";
import Navbar from '../components/Navbar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import createHistory from 'history/createBrowserHistory'
import { createBrowserHistory } from 'history'
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
import Subscriptions from './Subscriptions'
import { Container } from 'semantic-ui-react'
import FilterDropDown from './FilterDropDown'
const history = createBrowserHistory();

class App extends Component {


  logIn = (user, token, user_type) => {
    if (user) {
      this.props.setUser(user)
      localStorage.token = token
      this.props.setUserType(user_type)
      this.getAndSetSavedShows(user.id)
      this.getAndSetSubscriptions(user.id)
    }
  }

  getAndSetSavedShows = (user_id) => {
    API.getSavedShows(user_id)
    .then( shows => this.props.setSavedShows(shows))
  }

  getAndSetSubscriptions = (user_id) => {
    API.getSubscriptions(user_id)
      .then(subscriptions => this.props.setUserSubscriptions(subscriptions))
  }

  logOut = () => {
    this.props.setUser(null);
    localStorage.token = null;
    this.props.setUserType(null);
    this.props.setSavedShows(null)
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
        <div className="landing-image">
          <Navbar history={history} />

          <Container className="main-container" textAlign="center">
            <Switch>
              <Route exact path="/" component={Home} history={history} />
              <Route
                exact
                path="/login"
                component={() => (
                  <LoginForm logIn={this.logIn} history={history} />
                )}
              />
              <Route
                exact
                path="/sign-up"
                component={() => (
                  <SignUpForm logIn={this.logIn} history={history} />
                )}
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
                component={() => <Results history={history} />}
              />
              <Route
                exact
                path="/results/show"
                component={() => <ShowPage history={history} />}
              />
              <Route
                exact
                path="/user/watch-list"
                component={() => <SavedShows history={history} />}
              />
              <Route
                exact
                path="/user/subscriptions"
                component={() => <Subscriptions history={history} />}
              />
              <Route exact path="/dropdown" component={FilterDropDown} />

              <Route component={NotFound} />
            </Switch>
          </Container>
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
    setSavedShows: saved_shows => dispatch({ type: 'SET_SAVED_SHOWS', payload: { saved_shows } }),
    setUserSubscriptions: user_subscriptions => dispatch({ type: "SET_USER_SUBSCRIPTIONS", payload: { user_subscriptions }})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

