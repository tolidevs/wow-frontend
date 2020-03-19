import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
    Menu,
    Button,
    Icon
} from "semantic-ui-react";

// if want to add stying to all links use style={link}
// const link = {
//   width: "100px",
//   padding: "12px",
//   margin: "0 6px 6px",
//   background: "blue",
//   textDecoration: "none",
//   color: "white"
// };

class Navbar extends React.Component {
  

  selectMenu = () => {
    const { setMenu, menu_on } = this.props
    setMenu(!menu_on)
  }

  render() {
    const { loggedIn, menu_on } = this.props
    return (
      <Menu className="navbar" fixed="top">
        <Menu.Item position="right">
          <Button icon onClick={this.selectMenu}>
            {menu_on ? (
              // need to change this to history so when close menu takes you back to last page not home page
              // <NavLink to="/" exact>
              <Icon name="chevron up" onClick={() => this.props.history.goBack()}/>
              // </NavLink>
            ) : loggedIn ? (
              <NavLink to="/menu" exact>
                <Icon name="chevron down" />
              </NavLink>
            ) : (
              <NavLink to="/login" exact>
                <Icon name="chevron down" />
              </NavLink>
            )}
          </Button>
        </Menu.Item>
      </Menu>
    );
  }



  // end of class
}

const mapStateToProps = state => {
  return {
    loggedIn: !!state.user,
    menu_on: state.menu_on
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setMenu: menu_on => dispatch({ type: "SET_MENU", payload: { menu_on } })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
