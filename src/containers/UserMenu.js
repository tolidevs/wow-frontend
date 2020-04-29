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
                Get started by choosing one of the following options:
              </p>
            </Grid.Row>
            </Fragment>
        )
      case 'existing_user':
        return (
          <Fragment>
            <Grid.Row>
              <Header as="h1">
                Hi {user.name}, choose an option
              </Header>
            </Grid.Row>
            </Fragment>
        )
    }
  }

  render() {
    const { logOut, setUserType, setMenu } = this.props

    return (
      <Segment
        basic
        textAlign="center"
        style={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column >
            {this.setHeader()}

            <div className="menu-button">
              <NavLink exact to="/">
                <Button
                  size='huge'
                  fluid
                  onClick={() => {
                    setUserType('existing_user');
                    setMenu(false);
                  }}
                >
                  Search
                </Button>
              </NavLink>
            </div>
            <div className="menu-button">
              <NavLink exact to="/user/watch-list">
                <Button
                  fluid
                  size='huge'
                  onClick={() => {
                    setUserType('existing_user');
                    setMenu(false);
                  }}
                >
                  My Watch List
                </Button>
              </NavLink>
            </div>
            <div className="menu-button">
              <NavLink exact to="/user/subscriptions">
                <Button
                  fluid
                  size='huge'
                  onClick={() => {
                    setUserType('existing_user');
                    setMenu(false);
                  }}
                >
                  Manage Subscriptions
                </Button>
              </NavLink>
            </div>
            <div className="menu-button">
              <NavLink exact to="/">
                <Button
                  fluid
                  size='huge'
                  onClick={() => {
                    logOut();
                    setMenu(false);
                  }}
                >
                  Log Out
                </Button>
              </NavLink>
            </div>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}
    
const mapStateToProps = ({ user, user_type }) => {
  return {
    user,
    user_type
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch({ type: "SET_USER", payload: { user } }),
    setUserType: user_type => dispatch({ type: "SET_USER_TYPE", payload: { user_type } }),
    setMenu: menu_on => dispatch({ type: "SET_MENU", payload: { menu_on } })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu)