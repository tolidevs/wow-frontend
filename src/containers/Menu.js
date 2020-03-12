import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginForm from './LoginForm'
import { Container } from 'semantic-ui-react';

class Menu extends Component {
    render() { 
        return (
            <Container>
                <LoginForm />
            {/* <Router>
              <Route exact path="/login" component={LoginForm} />
              {/* <Route exact path="/sign-up" component={SignUp} /> */}
              {/* <Route exact path="/options" component={Options} */}
            {/* </Router> */} 
          </Container>
        );
    }
}
 
export default Menu;


            //     <NavLink to="/login" exact>
            //     Log In
            //   </NavLink>
            //   <NavLink to="/signup" exact>
            //     Sign Up
            //   </NavLink>
            //   <NavLink to="/options" exact>
            //     Options
            //   </NavLink>