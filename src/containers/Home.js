import React, { Component } from 'react';
import { Segment, Message } from 'semantic-ui-react';

class Home extends Component {
    render() { 
        return (
          <Segment
            textAlign="center"
            style={{ height: "100vh" }}
            verticalAlign="middle"
            
          >
            <Message>Home Page</Message>
          </Segment>
        );
    }
}
 
export default Home;