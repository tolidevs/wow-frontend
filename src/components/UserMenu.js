import React from 'react'
import { Grid, Segment, Button } from 'semantic-ui-react';


const UserMenu = () => {
    return (
      <Segment stacked>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: "50vh" }}>
            <div className="menu-button">
              <Button as="a">Watch List</Button>
            </div>
            <div className="menu-button">
              <Button as="a">Manage Account</Button>
            </div>
            <div className="menu-button">
              <Button as="a">Log Out</Button>
            </div>
          </Grid.Column>
        </Grid>
      </Segment>
    );
}
    
export default UserMenu;