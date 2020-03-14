import React, { Component } from 'react';
import { Segment, Message } from 'semantic-ui-react';

class Home extends Component {
    render() { 
        return (
          <Segment
            textAlign="center"
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Message>Home Page</Message>
          </Segment>
        );
    }
}
 
export default Home;