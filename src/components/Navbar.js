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
  render() {
      return (
        // <div className="navbar">
          <Menu fixed="top">
              <Menu.Item as='a' href="./menu" position="right">
                  <Button icon>
                      {/* needs to be chevron up or chevron down depending on if menu selected - set in state */}
                    <Icon name="chevron down" />
                  </Button>
              </Menu.Item>
          </Menu>
        // </div>
      );
  }
}

export default Navbar;
