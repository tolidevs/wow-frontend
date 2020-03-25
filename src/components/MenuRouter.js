import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'

class MenuRouter extends Component {
    state = {
        loggedIn: !!this.props.user,
        menu: null
    }

    
    
    
    render() { 
        return ( 
            <Router>
                <Switch>
                    {this.state.loggedIn ? <Route
                        exact
                        path="/login"
                        component={() => <LoginForm logIn={this.logIn} />}
                    /> :
                    
                    
                    
                    }
                    
                    <Route
                        exact
                        path="/sign-up"
                        component={() => <SignUpForm logIn={this.logIn} />}
                    />
                    <Route
                        exact
                        path="/menu"
                        component={() => (
                            <UserMenu logOut={this.logOut}/>
                        )}
                    />
                </Switch>
            </Router>
         );
    }
}

const mapStateToProps = ({ user }) => {
    return {
        user
    }
}

export default connect(MenuRouter)