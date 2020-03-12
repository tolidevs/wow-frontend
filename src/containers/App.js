import React, { Component } from "react";
import Navbar from '../components/Navbar'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../App.css';

import Home from './Home'
import MenuContainer from "./MenuContainer";


class App extends Component {

  state = {
    user: null
  }

  logIn = (user) => {
    this.setState({
      user
    })
  }

  render() {
    const { user } = this.state
    return (
      <Router>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/menu" component={() => <MenuContainer logIn={this.logIn} loggedIn={!!user}/> } />
      </Router>
      )
  }
}

export default App;

