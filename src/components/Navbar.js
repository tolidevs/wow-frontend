import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
    Menu,
    Button,
    Icon,
    Image
} from "semantic-ui-react";
import logo from '../images/logo.png'

class Navbar extends React.Component {
  
  

  selectMenu = () => {
    const { setMenu, menu_on } = this.props
    setMenu(!menu_on)
  }

  handleClick = () => {
    if (this.props.loggedIn) {
      this.selectMenu()
      return this.props.history.goBack()
    } 
  }

  render() {
    const { loggedIn, menu_on } = this.props
    return (
      <Menu className="navbar" fixed="top" borderless>
        <Menu.Item><NavLink to='/' exact ><Image src={logo} size="mini"></Image></NavLink></Menu.Item>
        <Menu.Item className="dropdown" position="right">
          {menu_on ? (
            // this pointless a is for styling as the navlink creates an a-tage which pushes the button over
            <a>
              <Button icon onClick={this.handleClick}>
              <Icon name="chevron up" />
            </Button>
            </a>
          ) : (
              loggedIn ? (
                <NavLink  to="/menu" exact>
                  <Button icon onClick={this.selectMenu}>
                    <Icon name="chevron down" />
                  </Button>
                </NavLink>
              ) : (
                  <NavLink  to="/login" exact>
                    <Button icon onClick={this.selectMenu}>
                      <Icon name="chevron down" />
                    </Button>
                  </NavLink>
            )
          )
          } 

          {/* <Button icon onClick={this.selectMenu}>
            {menu_on ? (
              // need to change this to history so when close menu takes you back to last page not home page
              // <NavLink to="/" exact>
              <Icon name="chevron up" onClick={() => this.props.history.goBack()}/>
              // </NavLink>
            ) : loggedIn ? (
                <NavLink id="down-arrow" to="/menu" style={{ textDecoration: "none" }} exact>
                <Icon name="chevron down" />
              </NavLink>
            ) : (
                  <NavLink to="/login" style={{ textDecoration: "none" }}exact>
                <Icon name="chevron down" />
              </NavLink>
            )}
          </Button> */}
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
