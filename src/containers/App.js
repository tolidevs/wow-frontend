import React, { Component } from "react";
import Navbar from '../components/Navbar'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../App.css';

import Home from './Home'
import Menu from './Menu'


class App extends Component {

  logIn = () => {

  }

  render() {
    return (
      <Router>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/menu" component={Menu} />
      </Router>
      )
  }
}

export default App;

