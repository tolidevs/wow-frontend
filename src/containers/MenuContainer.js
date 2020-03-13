import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginForm from './LoginForm'
import { Container } from 'semantic-ui-react';
import UserMenu from '../components/UserMenu';

class MenuContainer extends Component {
  render() { 
    const { logIn, loggedIn } = this.props  

        return (
          <Container>
            <Router>
              <Route exact path="/login" component={() => <LoginForm logIn={logIn} />} />
              <Route exact path="/sign-up" component={SignUp} />
              <Route exact path="/options" component={() => <UserMenu />} />
            </Router>
          </Container>
        );
    }
}
 
export default MenuContainer;


            //     <NavLink to="/login" exact>
            //     Log In
            //   </NavLink>
            //   <NavLink to="/signup" exact>
            //     Sign Up
            //   </NavLink>
            //   <NavLink to="/options" exact>
            //     Options
            //   </NavLink>