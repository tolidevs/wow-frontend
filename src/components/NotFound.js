import React from 'react';
import { Message } from 'semantic-ui-react'
import { Segment, Header } from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

const NotFound = () => {
    return (
        <Segment
            basic
            textAlign="center"
            verticalAlign="middle"
        >
            <Header as="h2">
                404 Page Not Found<br></br>
            Return to <NavLink to="/" exact>home</NavLink> 
          </Header>
        </Segment>
    ); 
}

export default(NotFound)