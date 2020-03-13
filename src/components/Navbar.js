import React from "react";
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
  state = {
    menuOn: false
  }

  selectMenu = () => {
    this.setState({
      menuOn: !this.state.menuOn
    })
  }

  render() {
    const { menuOn } =this.state
    const { loggedIn } = this.props
      return (
        // <div className="navbar">
        <Menu fixed="top">
          <Menu.Item position="right">
            <Button icon onClick={this.selectMenu}>
              {loggedIn ? (
                <NavLink to="/options" exact>
                  {menuOn ? (
                    <Icon name="chevron up" />
                  ) : (
                    <Icon name="chevron down" />
                  )}
                </NavLink>
              ) : (
                <NavLink to="/login" exact>
                  {menuOn ? (
                    <Icon name="chevron up" />
                  ) : (
                    <Icon name="chevron down" />
                  )}
                </NavLink>
              )}
            </Button>
          </Menu.Item>
        </Menu>
        // </div>
      );
  }
}

export default Navbar;
