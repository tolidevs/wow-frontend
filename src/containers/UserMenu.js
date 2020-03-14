import React, { Fragment, Component } from 'react'
import { Grid, Segment, Button, Header } from 'semantic-ui-react';
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";


class UserMenu extends Component {
  setHeader = () => {
    const { user_type, user } = this.props
    switch (user_type) {
      default:
        return null;
      case 'new_user':
        return (
          <Fragment>
            <Grid.Row>
              <Header as="h1">
                Welcome {user.name}<br></br> You're Signed Up!
              </Header>
            </Grid.Row>
            <Grid.Row>
              <p>
                Get started by choosing one of the options below to search for what's on where, or go to your account to manage your subscriptions
              </p>
            </Grid.Row>
            </Fragment>
        )
      case 'existing_user':
        return (
          <Fragment>
            <Grid.Row>
              <Header as="h1">
                Welcome back {user.name}
              </Header>
            </Grid.Row>
            </Fragment>
        )
    }
  }

  render() {
    const { logOut, setUserType } = this.props

    return (
      <Segment>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: "50vh" }}>
            {this.setHeader()}
            
            <div className="menu-button">
              <NavLink exact to='/'>
                <Button onClick={() => setUserType(null)}>Search</Button>
              </NavLink>
            </div>
            <div className="menu-button">
              <Button onClick={() => setUserType(null)}>Manage Account</Button>
            </div>
            <div className="menu-button">
              <NavLink exact to='/'>
                <Button onClick={() => logOut()} >Log Out</Button>
              </NavLink>
            </div>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}
    
const mapStateToProps = state => {
  return {
    user: state.user,
    user_type: state.user_type
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch({ type: "SET_USER", payload: { user } }),
    setUserType: user_type => dispatch({ type: "SET_USER_TYPE", payload: { user_type }})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu)