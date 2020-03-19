import React from 'react';
import { Message } from 'semantic-ui-react'

const NotFound = () => {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
        <Message >404 Page not found.</Message>
      </div>
    ); 
}

export default(NotFound)