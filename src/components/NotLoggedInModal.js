import React, { Component } from 'react';
import {
    Modal,
    Button,
    Icon
} from "semantic-ui-react";
import { NavLink } from 'react-router-dom';

class NotLoggedInModal extends Component {
    state = { open: false }

    handleOpen = () => this.setState({ open: true })

    handleClose = () => this.setState({ open: false })

    render() {
        return (
            <Modal open={this.state.open}
                trigger={<Icon
                    name="heart outline"
                    size="big"
                    onClose={this.handleClose}
                    onClick={this.handleOpen}
                />}
                basic
                size="tiny"
            >
                <Modal.Content>
                    <p>Please <NavLink to="/login">log in</NavLink> to save to your Watch List</p>
                </Modal.Content>
                <Modal.Actions>
                    <NavLink to="/login">
                        <Button color='blue' onClick={this.handleClose} inverted>
                            <Icon name='sign in' /> Log In
                        </Button>
                    </NavLink>
                    <Button color='yellow' onClick={this.handleClose} inverted>
                        <Icon name='arrow circle left' /> Go back
              </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default NotLoggedInModal
